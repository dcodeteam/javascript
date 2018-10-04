"use strict";

const fs = require("fs");
const { pass, fail } = require("create-jest-runner");

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

module.exports = async function runLint({ testPath, config }) {
  const start = new Date();
  const { __FIX__: fix } = config.globals;
  const original = fs.readFileSync(testPath, "utf-8");

  try {
    let content = original;

    if (isJSorTS(testPath)) {
      content = await runESLint(testPath, content, fix);
      content = await runImportSort(testPath, content, fix);
    } else if (isStyleSheet(testPath)) {
      content = await runStylelint(testPath, content, fix);
    }

    content = await runPrettier(testPath, content, fix);

    if (content !== original) {
      fs.writeFileSync(testPath, content, "utf-8");
    }
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
