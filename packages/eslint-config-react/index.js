"use strict";

module.exports = {
  env: { browser: true },

  extends: ["airbnb", "prettier/react", "@dc0de/eslint-config"],

  plugins: ["react-hooks"],

  rules: {
    //
    // eslint-plugin-import
    //

    // Minimize bundle size.
    "import/no-internal-modules": ["error", {}],

    //
    // eslint-plugin-react
    //

    "react/jsx-boolean-value": ["error", "always"],

    // Override `airbnb-eslint-config` warnings as errors.
    "react/no-danger": "error",

    // Forbid usage of UNSAFE React lifecycle methods.
    "react/no-unsafe": "error",

    // It's really hard to follow these rules in real life big applications.
    "react/sort-comp": ["off", {}],

    // TypeScript covers `prop-types` functionality.
    "react/prop-types": ["off", {}],

    // TypeScript covers this functionality.
    "react/jsx-no-undef": "off",

    // Sometimes we want to create multiple components in one file.
    "react/no-multi-comp": ["off", {}],

    // TypeScript already resolves imports.
    "react/jsx-filename-extension": ["off", {}],

    //
    // eslint-plugin-jsx-a11y
    //

    // Allow custom `Label` component..
    "jsx-a11y/label-has-for": [
      "error",
      {
        components: ["Label"],
        required: { some: ["nesting", "id"] },
      },
    ],

    // Ignore `Link` component added by `airbnb-config`.
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: [],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],

    //
    // eslint-plugin-react-hooks
    //

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
