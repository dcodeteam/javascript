"use strict";

module.exports = {
  testEnvironment: "node",
  setupTestFrameworkScriptFile: "<rootDir>/src/__testutils__/setupTests.ts",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  testRunner: "jest-circus/runner",
  testMatch: ["**/__tests__/**/*.spec.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx", "node"],
  coveragePathIgnorePatterns: [
    "/__docs__/",
    "/__mocks__/",
    "/__tests__/",
    "/__testutils__/",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
