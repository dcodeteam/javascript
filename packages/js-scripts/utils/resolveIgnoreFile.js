"use strict";

const fs = require("fs");
const path = require("path");
const { appDirectory } = require("../config/paths");

module.exports = function resolveIgnoreFile(fileName) {
  const fullPath = path.join(appDirectory, fileName);

  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf-8");
  }

  return null;
};
