"use strict";

module.exports = {
  env: { node: true },
  parserOptions: { sourceType: "script" },
  extends: ["@dc0de/eslint-config-base"],

  rules: {
    //
    // eslint
    //

    "no-console": "off",
    "global-require": "off",
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
