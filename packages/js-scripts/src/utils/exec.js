"use strict";

const { execSync } = require("child_process");

module.exports = function exec(command) {
  return execSync(command);
};
