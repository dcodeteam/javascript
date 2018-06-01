"use strict";

module.exports = {
  env: { es6: true },

  plugins: ["import"],

  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { experimentalObjectRestSpread: true },
  },

  extends: ["airbnb-base", "prettier"],

  rules: {
    //
    // eslint
    //

    // Just use Prettier ©
    "no-nested-ternary": "off",

    // Remind about technical debt.
    "no-warning-comments": [
      "warn",
      {
        location: "anywhere",
        terms: ["todo", "fixme"],
      },
    ],

    // Forbid to use built in logger.
    "no-console": "error",

    // Allow empty catch blocks.
    "no-empty": ["error", { allowEmptyCatch: true }],

    // It's ok to use hoisted functions before their actual declaration.
    "no-use-before-define": ["error", { functions: false }],

    //
    // eslint-plugin-import
    //

    // TODO: Check and remove or explain.
    "import/export": "off",

    // TODO: Check and remove or explain.
    "import/extensions": ["off", "always", {}],

    // TODO: Check and remove or explain.
    "import/no-extraneous-dependencies": ["off", {}],

    // We use `sort-import` to deal with styles.
    "import/first": ["off", "absolute-first"],

    // We prefer named exports.
    "import/prefer-default-export": "off",
  },
};
