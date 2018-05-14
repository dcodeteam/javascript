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

    // D:CODE Specific
    "no-console": "error",
    "no-useless-constructor": "off",
    "class-methods-use-this": ["off", {}],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-use-before-define": ["error", { functions: false }],

    //
    // eslint-plugin-import
    //

    "import/first": ["off", "absolute-first"],
    "import/export": "off",
    "import/extensions": ["off", "always", {}],
    "import/no-unresolved": ["off", {}],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["off", {}],

    "import/no-internal-modules": [
      "error",
      {
        allow: ["**/*.css", "**/*.scss"],
      },
    ],
  },
};
