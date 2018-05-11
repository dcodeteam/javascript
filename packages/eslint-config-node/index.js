"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "script",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  plugins: ["import"],

  extends: ["@dc0de/eslint-config-base"],

  rules: {
    //
    // eslint
    //

    "no-console": "off",
    strict: ["error", "safe"],

    //
    // eslint-plugin-import
    //

    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: false,
        optionalDependencies: false,
      },
    ],
  },
};
