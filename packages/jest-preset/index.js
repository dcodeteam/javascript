"use strict";

module.exports = function createConfig() {
  return {
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts?(x)"],
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: { "^.+\\.(ts|tsx)$": "babel-jest" },
    collectCoverageFrom: [
      "src/**/*.ts?(x)",
      "!src/**/__docs__/**/*",
      "!src/**/__tests__/**/*",
    ],
    coverageThreshold: {
      global: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  };
};
