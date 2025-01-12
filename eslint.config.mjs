import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default [
  eslint.configs.recommended,
  {
    ignores: [".astro/**/*", "dist/**/*"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        history: "readonly",
        navigator: "readonly",
        location: "readonly",
        fetch: "readonly",
        Buffer: "readonly",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        history: "readonly",
        navigator: "readonly",
        location: "readonly",
        fetch: "readonly",
        Buffer: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/triple-slash-reference": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
      ],
      "max-depth": ["error", 5],
      "max-lines-per-function": ["error", 100],
      complexity: ["error", 15],
      "no-shadow": "error",
      "no-duplicate-imports": "error",
      "prefer-template": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-shorthand": "error",
    },
  },
];
