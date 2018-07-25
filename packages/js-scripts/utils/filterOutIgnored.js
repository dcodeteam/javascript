"use strict";

const ignore = require("ignore");
const resolveIgnoreFile = require("./resolveIgnoreFile");

module.exports = function filterOutIgnored(paths, ignoreFiles) {
  if (Array.isArray(ignoreFiles)) {
    const ignorePatterns = ignoreFiles.map(resolveIgnoreFile).filter(Boolean);

    if (ignorePatterns.length > 0) {
      return ignore()
        .add(ignorePatterns.join("\n"))
        .filter(paths);
    }
  }

  return paths;
};
