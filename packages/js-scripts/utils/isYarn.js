"use strict";

const fs = require("fs");
const path = require("path");
const { memoize } = require("lodash");

const isYarnMemoized = memoize(() => {
  const yarnPath = path.resolve("./yarn.lock");

  return fs.existsSync(yarnPath);
});

module.exports = function isYarn() {
  return isYarnMemoized();
};
