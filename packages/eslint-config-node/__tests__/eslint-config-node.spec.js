"use strict";

const { CLIEngine } = require("eslint");
const config = require("../index");

describe("eslint-config-node", () => {
  it("should not throw", () => {
    expect(() => new CLIEngine({ baseConfig: config })).not.toThrow();
  });
});
