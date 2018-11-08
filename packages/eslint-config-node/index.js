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
        optionalDependencies: false
      }
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
    "node/no-unsupported-features/es-builtins": "error",
    "node/no-unsupported-features/es-syntax": "error",
    "node/no-unsupported-features/node-builtins": "error",
    "node/process-exit-as-throw": "error",
    "node/shebang": "error",

    // Best Practices
    "node/no-deprecated-api": "error",

    // Stylistic Issues
    "node/exports-style": "error",
    "node/prefer-global/buffer": "error",
    "node/prefer-global/console": "error",
    "node/prefer-global/process": "error",
    "node/prefer-global/url-search-params": "error",
    "node/prefer-global/url": "error"
  }
};
