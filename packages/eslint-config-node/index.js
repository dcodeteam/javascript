"use strict";

module.exports = {
  env: { node: true },
  parserOptions: { sourceType: "script" },

  plugins: ["node"],

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

    //
    // eslint-plugin-node
    //

    // Possible Errors
    "node/no-extraneous-import": "off",
    "node/no-extraneous-require": "off",
    "node/no-missing-import": "off",
    "node/no-missing-require": "off",
    "node/no-unpublished-bin": "error",
    "node/no-unpublished-import": "error",
    "node/no-unpublished-require": "error",
    "node/no-unsupported-features": "error",
    "node/process-exit-as-throw": "error",
    "node/shebang": "error",

    // Best Practices
    "node/no-deprecated-api": "error",

    // Stylistic Issues
    "node/exports-style": "error",
  },
};
