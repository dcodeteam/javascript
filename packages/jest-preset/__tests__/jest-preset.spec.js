"use strict";

// eslint-disable-next-line import/no-extraneous-dependencies
const { initJestPresetTest } = require("test-tools");

initJestPresetTest("jest-preset", require.resolve("../jest-preset"));
