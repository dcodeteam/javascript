"use strict";

const fs = require("fs");
const { pass, fail, skip } = require("create-jest-runner");

const sha256 = require("./utils/sha256");

function isJS(testPath) {
  return testPath.endsWith(".js") || testPath.endsWith(".jsx");
}

function isTS(testPath) {
  return testPath.endsWith(".ts") || testPath.endsWith(".tsx");
}

function isJSorTS(testPath) {
  return isJS(testPath) || isTS(testPath);
}

function isStyleSheet(testPath) {
  return (
    testPath.endsWith(".css") ||
    testPath.endsWith(".less") ||
    testPath.endsWith(".scss")
  );
}

function resolveFormatted(content, formatted, fix) {
  if (fix || content === formatted) {
    return formatted;
  }

  const diff = require("jest-diff");

  throw new Error(diff(formatted, content, { expand: false }));
}

function runESLint(testPath, content, fix) {
  let CLI;

  try {
    CLI = require("eslint").CLIEngine;
  } catch (e) {
    return content;
  }
  const cli = new CLI({ fix });
  const report = cli.executeOnText(content, testPath);

  if (report.errorCount > 0) {
    const formatter = cli.getFormatter();

    throw new Error(formatter(CLI.getErrorResults(report.results)));
  }
  const fixed = !fix
    ? null
    : report.results.reverse().find(x => x.output != null);

  return fixed != null ? fixed.output : content;
}

function runStylelint(testPath, content, fix) {
  let stylelint;

  try {
    stylelint = require("stylelint");
  } catch (e) {
    return content;
  }

  return stylelint.lint({ fix, files: testPath });
}

function runPrettier(testPath, content, fix) {
  let prettier;

  try {
    prettier = require("prettier");
  } catch (e) {
    return content;
  }

  return prettier
    .resolveConfig(testPath)
    .then(options => ({ ...options, filepath: testPath }))
    .then(options =>
      resolveFormatted(content, prettier.format(content, options), fix),
    );
}

function runImportSort(testPath, content, fix) {
  let sort;
  let style;
  let parser;

  try {
    sort = require("import-sort").sortImports;
    style = require("import-sort-style-module").default;
    parser = isJS(testPath)
      ? require("import-sort-parser-babylon")
      : isTS(testPath)
        ? require("import-sort-parser-typescript")
        : null;
  } catch (e) {
    return content;
  }

  if (!parser) {
    return content;
  }

  const sortResult = sort(content, parser, style, testPath, {
    parser,
    style,
    options: {},
  });

  return resolveFormatted(content, sortResult.code, fix);
}

async function lintContent(testPath, input, fix) {
  let output = input;

  if (isJSorTS(testPath)) {
    output = await runESLint(testPath, output, fix);
    output = await runImportSort(testPath, output, fix);
  } else if (isStyleSheet(testPath)) {
    output = await runStylelint(testPath, output, fix);
  }

  output = await runPrettier(testPath, output, fix);

  return output;
}

function getCacheStorage() {
  const flatCache = require("flat-cache");

  return flatCache.load("js-scripts");
}

function isCached(testPath, input) {
  const storage = getCacheStorage();
  const testPathHash = sha256(testPath);
  const inputHash = storage.getKey(testPathHash);

  return !inputHash ? false : inputHash === sha256(input);
}

function persistCache(testPath, output) {
  const storage = getCacheStorage();
  const testPathHash = sha256(testPath);

  storage.setKey(testPathHash, sha256(output));
  storage.save(true);
}

module.exports = async function runLint({ testPath, config }) {
  const start = new Date();
  const {
    cache,
    globals: { __FIX__: fix },
  } = config;

  const input = fs.readFileSync(testPath, "utf-8");

  if (cache && isCached(testPath, input)) {
    return skip({ start, test: { path: testPath } });
  }

  try {
    const output = await lintContent(testPath, input, fix);

    if (input !== output) {
      fs.writeFileSync(testPath, output, "utf-8");
    }

    persistCache(testPath, output);
  } catch (e) {
    return fail({
      start,
      end: new Date(),
      test: { path: testPath, errorMessage: e.stack || e.message },
    });
  }

  return pass({
    start,
    end: new Date(),
    test: { path: testPath },
  });
};
