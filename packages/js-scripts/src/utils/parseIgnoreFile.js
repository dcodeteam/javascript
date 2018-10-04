"use strict";

const fs = require("fs");
const parse = require("parse-gitignore");
const globToRegExp = require("glob-to-regexp");

module.exports = function parseIgnoreFile(filePath) {
  return !fs.existsSync(filePath)
    ? []
    : parse(fs.readFileSync(filePath, "utf-8")).map(
        x => globToRegExp(x, { flags: "g" }).source,
      );
};
