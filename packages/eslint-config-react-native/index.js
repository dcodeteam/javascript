"use strict";

module.exports = {
  env: {
    node: false,
    browser: false,
    "react-native/react-native": true,
  },

  plugins: ["react-native"],
  extends: ["@dc0de/eslint-config-react"],

  rules: {
    //
    // eslint-plugin-react-native
    //

    // Keep code clean.
    "react-native/no-unused-styles": "error",
    // Prefer usage of `StyleSheet`.
    "react-native/no-inline-styles": "error",
    // Use theme constants..
    "react-native/no-color-literals": "error",
    // Keep app consistent.
    "react-native/split-platform-components": "error",
  },
};
