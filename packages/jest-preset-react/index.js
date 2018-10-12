"use strict";

const createBaseConfig = require("@dc0de/jest-preset");

module.exports = function createConfig() {
  const baseConfig = createBaseConfig();

  return {
    ...baseConfig,
    testEnvironment: "jsdom",
    snapshotSerializers: ["enzyme-to-json/serializer"],
  };
};
