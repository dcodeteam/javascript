"use strict";

const baseConfig = require("@dc0de/jest-preset");

module.exports = {
  ...baseConfig,
  testEnvironment: "jsdom",
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
