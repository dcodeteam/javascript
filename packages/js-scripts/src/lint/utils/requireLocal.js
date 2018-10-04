"use strict";

const path = require("path");
const findUp = require("find-up");

module.exports = function requireLocal(moduleName, rootDir) {
  const nodeModulesPath = findUp.sync("node_modules", { cwd: rootDir });

  return require(path.resolve(nodeModulesPath, moduleName));
};
