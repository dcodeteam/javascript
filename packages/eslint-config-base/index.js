"use strict";

module.exports = {
  env: { es6: true },

  plugins: ["import"],

  parserOptions: {
    ecmaVersion: 2018,
  },

  extends: ["airbnb-base", "prettier"],

  rules: {
    //
    // eslint
    //

    //
    // Possible Errors

    // Disallow using an async function as a Promise executor.
    "no-async-promise-executor": "error",

    // Disallow assignment operators in conditional expressions.
    "no-cond-assign": ["error", "except-parens"],

    // Disallow the use of `console`.
    "no-console": "error",

    // Disallow constant expressions in conditions.
    "no-constant-condition": "error",

    // Disallow empty block statements except `catch`.
    "no-empty": ["error", { allowEmptyCatch: true }],

    // Disallow characters which are made with multiple code points in
    // character class syntax.
    "no-misleading-character-class": "error",

    // Disallow assignments that can lead to race conditions due to usage of
    // `await` or `yield`.
    "require-atomic-updates": "error",

    //
    // Stylistic Issues

    // Require named `function` expressions.
    "func-names": ["error", "always"],

    // Allow nested ternary expressions.
    "no-nested-ternary": "off",

    // Allow the unary operators `++` and `--`.
    "no-plusplus": ["off", {}],

    // Require or disallow padding lines between statements.
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "always", prev: "*", next: "return" },
    ],

    // Disallow using `Object.assign` with an object literal as the first
    // argument and prefer the use of object spread instead.
    "prefer-object-spread": "error",

    //
    // ECMAScript 6

    // Require braces around arrow function bodies.
    "arrow-body-style": [
      "error",
      "as-needed",
      { requireReturnForObjectLiteral: false },
    ],

    // Require using arrow functions for callbacks.
    "prefer-arrow-callback": [
      "error",
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],

    //
    // Best Practices

    // Enforce consistent brace style for all control statements.
    curly: ["error", "all"],

    // Disallow the use of `alert`, `confirm`, and `prompt`.
    "no-alert": "error",

    // Disallow specified warning terms in comments.
    "no-warning-comments": [
      "warn",
      {
        location: "anywhere",
        terms: ["todo", "fixme"],
      },
    ],

    //
    // Variables

    // Allow the use of variables before they are defined.
    "no-use-before-define": ["error", { functions: false }],

    //
    // eslint-plugin-import
    //

    //
    // Style guide

    // Do not ensure all imports appear before other statements.
    "import/first": ["off", "absolute-first"],

    // Do not enforce a convention in module import order.
    "import/order": ["off", { groups: [["builtin", "external", "internal"]] }],

    // Do not prefer a default export if module exports a single name.
    "import/prefer-default-export": "off",
  },
};
