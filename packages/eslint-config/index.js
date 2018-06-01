"use strict";

module.exports = {
  parser: "typescript-eslint-parser",

  plugins: ["typescript"],

  settings: {
    "import/parsers": {
      "typescript-eslint-parser": [".ts", ".tsx"],
    },
  },

  extends: ["@dc0de/eslint-config-base"],

  rules: {
    //
    // eslint
    //

    // Disable because of `typescript-eslint-parser` limitations.
    // See: https://github.com/eslint/typescript-eslint-parser#known-issues
    "no-undef": "off",
    "import/prefer-default-export": "off",

    // TODO: https://github.com/eslint/typescript-eslint-parser/issues/439
    "no-shadow-restricted-names": "off",

    // TODO: https://github.com/eslint/typescript-eslint-parser/issues/414
    "no-restricted-globals": ["off", {}],

    // TODO: https://github.com/nzakas/eslint-plugin-typescript/issues/new
    "no-multi-str": "off",

    // With class approach we sometimes just want to use it's methods.
    "class-methods-use-this": ["off", {}],

    // Disable to ignore TypeScript constructor assignment.
    "no-useless-constructor": "off",

    // Typescript covers these.
    "no-cond-assign": ["off", {}],
    "no-unused-vars": ["off", {}],
    "consistent-return": "off",

    //
    // eslint-plugin-import
    //

    // TypeScript already resolves imports.
    "import/no-unresolved": ["off", {}],
    "import/extensions": ["off", "always", {}],
    "import/no-extraneous-dependencies": ["off", {}],

    //
    // eslint-plugin-typescript
    //

    // TODO: https://github.com/nzakas/eslint-plugin-typescript/pull/125
    "typescript/explicit-function-return-type": "off",

    "typescript/no-type-alias": "off",
    "typescript/no-explicit-any": "off",
    "typescript/member-ordering": "off",
    "typescript/no-var-requires": "off",
    "typescript/no-non-null-assertion": "off",

    "typescript/explicit-member-accessibility": "error",
    "typescript/adjacent-overload-signatures": "error",
    "typescript/class-name-casing": "error",
    "typescript/interface-name-prefix": "error",
    "typescript/member-delimiter-style": "error",
    "typescript/member-naming": "error",
    "typescript/no-angle-bracket-type-assertion": "error",
    "typescript/no-array-constructor": "error",
    "typescript/no-namespace": "error",
    "typescript/no-triple-slash-reference": "error",
    "typescript/no-unused-vars": "error",
    "typescript/no-use-before-define": ["error", { functions: false }],
    "typescript/prefer-namespace-keyword": "error",
    "typescript/type-annotation-spacing": "error",
  },
};
