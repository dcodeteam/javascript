"use strict";

const path = require("path");
const glob = require("globby");
const filterOutIgnored = require("./filterOutIgnored");

module.exports = async function resolveFiles(patterns, ignoreFiles) {
  const files = await glob(patterns, {
    ignore: ["**/node_modules/**"],
  });

  const filtered = filterOutIgnored(files, ignoreFiles);

  return filtered.map(x => path.resolve(x));
};
