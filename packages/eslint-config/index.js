"use strict";

module.exports = {
  extends: ["@dc0de/eslint-config-base"],

  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json" },

  plugins: ["@typescript-eslint"],

  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": { typescript: {} },
  },

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

    // Require that member overloads be consecutive.
    "@typescript-eslint/adjacent-overload-signatures": "error",

    // Requires using either T[] or Array<T> for arrays.
    "@typescript-eslint/array-type": ["error", "generic"],

    // Enforces that types will not to be used.
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          String: {
            message: "Use string instead",
            fixWith: "string",
          },
          Boolean: {
            message: "Use boolean instead",
            fixWith: "boolean",
          },
          Number: {
            message: "Use number instead",
            fixWith: "number",
          },
          Object: {
            message: "Use object instead",
            fixWith: "object",
          },
          Symbol: {
            message: "Use symbol instead",
            fixWith: "symbol",
          },
        },
      },
    ],

    // Enforce camelCase naming convention.
    camelcase: ["off", {}],
    "@typescript-eslint/camelcase": [
      "error",
      {
        allow: [],
        properties: "always",
        ignoreDestructuring: false,
      },
    ],

    // Require PascalCased class and interface names.
    "@typescript-eslint/class-name-casing": "error",

    // Require explicit return types on functions and class methods.
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],

    // All class members has to be annotated.
    "@typescript-eslint/explicit-member-accessibility": "error",

    // Enforces naming of generic type variables.
    "@typescript-eslint/generic-type-naming": "error",

    // Do not enforce consistent indentation.
    "@typescript-eslint/indent": "off",

    // Do not require that interface names be prefixed with `I`.
    "@typescript-eslint/interface-name-prefix": ["error", "never"],

    // Do not require a specific member delimiter style for interfaces and type
    // literals.
    "@typescript-eslint/member-delimiter-style": "off",

    // Do not enforce naming conventions for class members by visibility.
    "@typescript-eslint/member-naming": "off",

    // Do not require a consistent member declaration order.
    "@typescript-eslint/member-ordering": "off",

    // Enforces the use of as Type assertions instead of <Type> assertions.
    "@typescript-eslint/no-angle-bracket-type-assertion": "error",

    // Disallow generic Array constructors.
    "@typescript-eslint/no-array-constructor": "error",

    // Disallow the declaration of empty interfaces.
    "@typescript-eslint/no-empty-interface": "error",

    // Disallow usage of the `any` type.
    "@typescript-eslint/no-explicit-any": "error",

    // Forbids the use of classes as namespaces.
    "@typescript-eslint/no-extraneous-class": [
      "error",
      {
        allowEmpty: false,
        allowStaticOnly: false,
        allowConstructorOnly: false,
      },
    ],

    // Disallows explicit type declarations for variables or parameters
    // initialized to a number, string, or boolean.
    "@typescript-eslint/no-inferrable-types": [
      "error",
      { ignoreProperties: false, ignoreParameters: true },
    ],

    // Enforce valid definition of new and constructor.
    "@typescript-eslint/no-misused-new": "error",

    // Disallow the use of custom TypeScript modules and namespaces.
    "@typescript-eslint/no-namespace": [
      "error",
      { allowDeclarations: false, allowDefinitionFiles: true },
    ],

    // Allows non-null assertions using the `!` postfix operator.
    "@typescript-eslint/no-non-null-assertion": "off",

    // Forbids an object literal to appear in a type assertion expression.
    "@typescript-eslint/no-object-literal-type-assertion": [
      "error",
      { allowAsParameter: false },
    ],

    // Allow the use of parameter properties in class constructors.
    "@typescript-eslint/no-parameter-properties": "off",

    // Disallow aliasing `this`.
    "@typescript-eslint/no-this-alias": [
      "error",
      { allowedNames: [], allowDestructuring: true },
    ],

    // Disallow `/// <reference path="" />` comments.
    "@typescript-eslint/no-triple-slash-reference": "error",

    // Allow the use of type aliases.
    "@typescript-eslint/no-type-alias": [
      "error",
      {
        allowAliases: "always",
        allowCallbacks: "always",
        allowLiterals: "in-unions-and-intersections",
        allowMappedTypes: "always",
      },
    ],

    // We prefer TypeScript `noUnusedLocals` option.
    "no-unused-vars": ["off", {}],
    "@typescript-eslint/no-unused-vars": "off",

    // Disallow the use of variables before they are defined.
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],

    // Disallows the use of require statements except in import statements.
    "@typescript-eslint/no-var-requires": "error",

    // Prefer an interface declaration over a type literal `(type T = { ... })`.
    "@typescript-eslint/prefer-interface": "error",

    // Require the use of the `namespace` keyword instead of the `module`
    // keyword to declare custom TypeScript modules.
    "@typescript-eslint/prefer-namespace-keyword": "error",

    // When adding two variables, operands must both be of type number or of
    // type string.
    "@typescript-eslint/restrict-plus-operands": "error",

    // Do not require consistent spacing around type annotations.
    "@typescript-eslint/type-annotation-spacing": "off",
  },
};
