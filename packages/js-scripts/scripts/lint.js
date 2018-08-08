"use strict";

const pkg = require("../package.json");
const spawn = require("../utils/spawn");
const resolveBin = require("../utils/resolveBin");
const resolveFiles = require("../utils/resolveFiles");
const resolveStagedFiles = require("../utils/resolveStagedFiles");

module.exports = { lint };

const codeFilesPattern = "**/*.{js,jsx,ts,tsx}";
const styleFilesPattern = "**/*.{css,sass,scss,less}";
const textFilesPattern = "**/*.{js,jsx,ts,tsx,md,json,css,sass,scss,less}";

async function lint({ fix, staged }) {
  const [codeFiles, styleFiles, textFiles] = await Promise.all(
    staged
      ? [
          resolveStagedFiles(codeFilesPattern, [".gitignore", ".eslintignore"]),
          resolveStagedFiles(styleFilesPattern, [
            ".gitignore",
            ".stylelintignore",
          ]),
          resolveStagedFiles(textFilesPattern, [
            ".gitignore",
            ".prettierignore",
          ]),
        ]
      : [
          resolveFiles(codeFilesPattern, [".gitignore", ".eslintignore"]),
          resolveFiles(styleFilesPattern, [".gitignore", ".stylelintignore"]),
          resolveFiles(textFilesPattern, [".gitignore", ".prettierignore"]),
        ],
  );

  if (codeFiles.length > 0) {
    await lintCode({ fix: staged || fix, files: codeFiles });
    await sortImports({ fix: staged || fix, files: codeFiles });
  }

  if (styleFiles.length > 0) {
    await lintStyle({ fix: staged || fix, files: styleFiles });
  }

  if (textFiles.length > 0) {
    await reformat({ fix: staged || fix, files: textFiles });
  }

  if (staged) {
    if (codeFiles.length > 0) {
      await gitAdd({ files: codeFiles });
    }

    if (styleFiles.length > 0) {
      await gitAdd({ files: styleFiles });
    }

    if (textFiles.length > 0) {
      await gitAdd({ files: textFiles });
    }
  }
}

function tryResolveBin(moduleName, binName) {
  try {
    return resolveBin(moduleName, binName);
  } catch (e) {
    console.log(
      "warn: `%s` not installed. Run `yarn add -D %s@%s`",
      moduleName,
      moduleName,
      pkg.optionalDependencies[moduleName],
    );

    return null;
  }
}

function trySpawn(command, args, options) {
  const result = spawn(command, args, options);

  if (result.status !== 0) {
    process.exit(1);
  }
}

async function lintCode({ fix, files }) {
  const eslintPath = tryResolveBin("eslint");

  if (eslintPath) {
    trySpawn("node", [eslintPath, fix ? "--fix" : "--quiet", ...files]);
  }
}

async function lintStyle({ fix, files }) {
  const stylelintPath = tryResolveBin("stylelint");

  if (stylelintPath) {
    trySpawn("node", [stylelintPath, fix ? "--fix" : "--quiet", ...files]);
  }
}

async function reformat({ fix, files }) {
  const prettierPath = tryResolveBin("prettier");

  if (prettierPath) {
    trySpawn("node", [
      prettierPath,
      fix ? "--write" : "--list-different",
      ...files,
    ]);
  }
}

async function sortImports({ fix, files }) {
  const fs = require("fs");
  const path = require("path");
  const babylonParser = require("import-sort-parser-babylon");
  const typescriptParser = require("import-sort-parser-typescript");
  const { default: style } = require("import-sort-style-module");
  const { sortImports: sort } = require("import-sort");

  const diff = [];

  const parsers = new Map([
    [".js", babylonParser],
    [".jsx", babylonParser],
    [".ts", typescriptParser],
    [".tsx", typescriptParser],
  ]);

  files.forEach(x => {
    const parser = parsers.get(path.extname(x));

    if (parser) {
      const content = fs.readFileSync(x, "utf-8");
      const sortResult = sort(content, parser, style, x, {
        parser,
        style,
        options: {},
      });

      if (sortResult.changes.length > 0) {
        if (fix) {
          fs.writeFileSync(x, sortResult.code, "utf-8");
        } else {
          diff.push(x);
        }
      }
    }
  });

  if (diff.length > 0) {
    console.log(diff.join("\n"));
    process.exit(1);
  }
}

async function gitAdd({ files }) {
  trySpawn("git", ["add", ...files]);
}
