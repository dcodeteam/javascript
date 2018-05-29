"use strict";

const path = require("path");
const glob = require("globby");

module.exports = function resolveFiles(patterns, fallbackPatterns) {
  const filePatterns =
    patterns && patterns.length > 0 ? patterns : fallbackPatterns;

  return glob
    .sync(filePatterns, {
      ignore: ["**/node_modules/**"],
    })
    .map(x => path.resolve(x));
};
