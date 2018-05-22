"use strict";

module.exports = {
  env: { browser: true },

  extends: ["airbnb", "prettier/react", "@dc0de/eslint-config"],

  rules: {
    //
    // eslint-plugin-react
    //

    "react/sort-comp": ["off", {}],
    "react/jsx-no-undef": "off",
    "react/jsx-filename-extension": ["off", {}],
    "react/jsx-max-props-per-line": ["off", {}],
    "react/jsx-first-prop-new-line": ["off", {}],
    "react/prefer-stateless-function": ["off", {}],
    "react/jsx-boolean-value": ["error", "always"],

    //
    // eslint-plugin-jsx-a11y
    //

    "jsx-a11y/label-has-for": [
      "error",
      {
        components: ["Label"],
        required: { some: ["nesting", "id"] },
      },
    ],

    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: [],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
  },
};
