"use strict";

const baseConfig = require("@dc0de/jest-preset");

module.exports = {
  ...baseConfig,
  testEnvironment: "jsdom",
};
