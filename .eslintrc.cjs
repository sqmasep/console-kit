module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ["eskiu/ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [],
  rules: {
    // same as eslint-config-eskiu/ts, but without the boolean prefixes rule
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
        prefix: ["T"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require",
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message:
          "Enums are not allowed. Consider using an object or a map instead.",
      },
    ],
  },
};
