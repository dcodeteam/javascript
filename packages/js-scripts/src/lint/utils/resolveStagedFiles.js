"use strict";

const path = require("path");
const exec = require("../../utils/exec");

module.exports = function resolveStagedFiles(cwd) {
  const rootPath = exec("git rev-parse --show-toplevel")
    .toString()
    .trim();

  return (
    exec("git diff --name-only --cached")
      .toString()
      .trim()
      .split("\n")
      // Make absolute path.
      .map(x => path.join(rootPath, x))
      // Keep only files under current cwd.
      .filter(x => x.startsWith(cwd))
      // Make files relative to current cwd.
      .map(x => path.relative(cwd, x))
  );
};
