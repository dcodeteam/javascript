"use strict";

const path = require("path");
const glob = require("globby");
const ignore = require("ignore");
const resolveIgnoreFile = require("./resolveIgnoreFile");

function filterOutIgnored(paths, ignoreFiles) {
  if (Array.isArray(ignoreFiles)) {
    const ignorePatterns = ignoreFiles.map(resolveIgnoreFile).filter(Boolean);

    if (ignorePatterns.length > 0) {
      return ignore()
        .add(ignorePatterns.join("\n"))
        .filter(paths);
    }
  }

  return paths;
}

module.exports = function resolveFiles(
  patterns,
  fallbackPatterns,
  ignoreFiles,
) {
  const filePatterns =
    patterns && patterns.length > 0 ? patterns : fallbackPatterns;

  const files = glob.sync(filePatterns, {
    ignore: ["**/node_modules/**"],
  });

  const filtered = filterOutIgnored(files, ignoreFiles);

  return filtered.map(x => path.resolve(x));
};
