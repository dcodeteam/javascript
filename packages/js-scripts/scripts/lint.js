"use strict";

const spawn = require("../utils/spawn");
const resolveBin = require("../utils/resolveBin");
const resolveFiles = require("../utils/resolveFiles");

module.exports = { lint };

const codeFilesPattern = "**/*.{js,jsx,ts,tsx}";
const styleFilesPattern = "**/*.{css,sass,less}";
const textFilesPattern = "**/*.{js,jsx,ts,tsx,md,json,css,scss,less}";

async function lint({ fix }) {
  const [codeFiles, styleFiles, textFiles] = await Promise.all([
    resolveFiles(codeFilesPattern, [".gitignore", ".eslintignore"]),
    resolveFiles(styleFilesPattern, [".gitignore", ".stylelintignore"]),
    resolveFiles(textFilesPattern, [".gitignore", ".prettierignore"]),
  ]);

  if (codeFiles.length > 0) {
    await lintCode({ fix, files: codeFiles });
    await sortImports({ fix, files: codeFiles });
  }

  if (styleFiles.length > 0) {
    await lintStyle({ fix, files: styleFiles });
  }

  if (textFiles.length > 0) {
    await reformat({ fix, files: textFiles });
  }
}

async function lintCode({ fix, files }) {
  const eslintPath = resolveBin("eslint");

  spawn("node", [eslintPath, fix ? "--fix" : "--quiet", ...files]);
}

async function lintStyle({ fix, files }) {
  let stylelintPath = null;

  try {
    stylelintPath = resolveBin("stylelint");
  } catch (e) {}

  if (stylelintPath) {
    spawn("node", [stylelintPath, fix ? "--fix" : "", ...files]);
  }
}

async function reformat({ fix, files }) {
  const prettierPath = resolveBin("prettier");

  spawn("node", [prettierPath, fix ? "--write" : "--list-different", ...files]);
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
