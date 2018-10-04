"use strict";

const jest = require("jest");
const parseIgnoreFile = require("../utils/parseIgnoreFile");

module.exports = { lint };

const testFiles = [
  "js",
  "jsx",
  "json",
  "ts",
  "tsx",
  "css",
  "less",
  "scss",
  "graphql",
  "md",
  "markdown",
];

function lint({ fix, staged }) {
  const ignored = [
    ...parseIgnoreFile(".gitignore"),
    ...parseIgnoreFile(".eslintignore"),
    ...parseIgnoreFile(".prettierignore"),
    ...parseIgnoreFile(".stylelintignore"),
  ];

  const shouldFix = Boolean(fix || staged);

  const argv = ["--bail", "--no-cache"];

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
    argv.push("--onlyChanged");
  }

  if (!shouldFix) {
    argv.push("--runInBand");
  }

  jest.run(argv);
}
