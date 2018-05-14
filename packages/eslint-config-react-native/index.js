"use strict";

module.exports = {
  env: {
    node: false,
    browser: false,
    "react-native/react-native": true,
  },

  extends: ["@dc0de/eslint-config-react"],

  rules: {
    //
    // eslint-plugin-react-native
    //

    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "error",
    "react-native/no-inline-styles": "error",
    "react-native/no-color-literals": "error",
  },
};
