"use strict";

const { initConfigTest } = require("@dc0de/eslint-test-tools");

initConfigTest("eslint-config-node", require.resolve("../index"));
