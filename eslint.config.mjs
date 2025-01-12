import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Error prevention
      "no-console": ["warn"],
      "no-debugger": ["error"],
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-undef": ["error"],

      // Best practices
      eqeqeq: ["error", "always"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

      // Style consistency
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],

      // TypeScript specific
      "@typescript-eslint/explicit-module-boundary-types": ["warn"],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  {
    files: ["*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    files: ["tailwind.config.cjs", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    ignores: ["dist/**", ".astro", "src/components/PostHog.astro"],
  },
];
