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

    // We do not need these, since TypeScript has type checks.
    "consistent-return": "off",
    "array-callback-return": ["off", {}],

    // We prefer TypeScript `noUnusedLocals` option.
    "no-unused-vars": ["off", {}],

    // Disable to ignore TypeScript constructor assignment.
    "no-useless-constructor": "off",

    // With class approach we sometimes just want to use it's methods.
    "class-methods-use-this": ["off", {}],

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

    // It's useless now cause of lots of issues related to typescript-eslint-parser.
    "typescript/member-ordering": "off",

    // It's not actually helping.
    "typescript/member-naming": "off",

    // This rule is useless without core `no-unused-vars`.
    "typescript/no-unused-vars": "off",

    // Just use Prettier ©
    "typescript/member-delimiter-style": "off",
    "typescript/type-annotation-spacing": "off",

    // It helps a lot and should be used.
    "typescript/no-non-null-assertion": "off",

    // We want to avoid usage of `any` type as much as possible.
    "typescript/no-explicit-any": "error",

    // Forbid raw usage of require.
    "typescript/no-var-requires": "error",

    // Only PascalCase class names.
    "typescript/class-name-casing": "error",

    // We want to declare arrays consistently.
    "typescript/no-array-constructor": "error",

    // Forbid usage of old `module` declaration keyword.
    "typescript/prefer-namespace-keyword": "error",

    // All references should be imported.
    "typescript/no-triple-slash-reference": "error",

    // All class members has to be annotated.
    "typescript/explicit-member-accessibility": "error",

    // Do not mix function overloads
    "typescript/adjacent-overload-signatures": "error",

    // We want to keep consistent type casting.
    "typescript/no-angle-bracket-type-assertion": "error",

    // Interface names should have same style as class names and type names.
    "typescript/interface-name-prefix": ["error", "never"],

    // Add TypeScript to core `no-use-before-define`.
    "typescript/no-use-before-define": ["error", { functions: false }],

    // We use namespaces only inside type definitions.
    "typescript/no-namespace": [
      "error",
      { allowDeclarations: false, allowDefinitionFiles: true },
    ],

    // Do not allow to create obsolete aliases.
    "typescript/no-type-alias": [
      "off", // TODO: Wait for https://github.com/nzakas/eslint-plugin-typescript/pull/137
      {
        allowAliases: "always",
        allowCallbacks: "always",
        allowLiterals: "never",
        allowMappedTypes: "always",
      },
    ],
  },
};
