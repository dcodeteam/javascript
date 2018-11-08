"use strict";

const jest = require("jest");
const parseIgnoreFile = require("../utils/parseIgnoreFile");
const resolveStagedFiles = require("./utils/resolveStagedFiles");

module.exports = { lint };

const testFiles = [
  "json",

  "js",
  "jsx",

  "ts",
  "tsx",

  "css",
  "less",
  "scss",

  "md",
  "markdown",

  "yml",
  "yaml",

  "graphql"
];

function lint({ cwd, fix, cache, staged }) {
  const ignored = [
    new RegExp("/package.json").source,
    new RegExp("/package-lock.json").source,

    ...parseIgnoreFile(".gitignore"),
    ...parseIgnoreFile(".eslintignore"),
    ...parseIgnoreFile(".prettierignore"),
    ...parseIgnoreFile(".stylelintignore")
  ];

  const shouldFix = Boolean(fix || staged);

  const argv = ["--no-watchman"];

  if (!shouldFix) {
    argv.push("--bail");
    argv.push("--runInBand");
  }

  if (cache) {
    argv.push("--cache");
  } else {
    argv.push("--no-cache");
  }

  argv.push("--runner", require.resolve("./jest-runner-lint"));

  ignored.forEach(x => {
    argv.push("--testPathIgnorePatterns", x);
  });

  testFiles.forEach(ext => {
    argv.push("--testMatch", `**/*.${ext}`);
    argv.push("--moduleFileExtensions", ext);
  });

  argv.push("--config", JSON.stringify({ globals: { __FIX__: shouldFix } }));

  if (staged) {
    const stagedFiles = resolveStagedFiles(cwd);

    argv.push("--findRelatedTests", ...stagedFiles);
  }

  jest.run(argv);
}
