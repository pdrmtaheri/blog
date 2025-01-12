import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import astroPlugin from "eslint-plugin-astro";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import astroParser from "astro-eslint-parser";
import prettier from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseRules = {
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "no-debugger": "warn",
  "no-unused-vars": "warn",
  "prefer-const": "error",
  eqeqeq: ["error", "always"],
  "prettier/prettier": "error",
  // Security plugin base rules
  "security/detect-object-injection": "off",
  "security/detect-non-literal-regexp": "warn",
  "security/detect-unsafe-regex": "error",
  "security/detect-buffer-noassert": "error",
  "security/detect-eval-with-expression": "error",
};

export default [
  {
    ignores: ["dist/**/*", "node_modules/**/*", ".astro/**/*"],
  },
  {
    files: ["**/*.js"],
    ...js.configs.recommended,
    plugins: {
      prettier,
      security: securityPlugin,
    },
    rules: baseRules,
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      prettier,
      security: securityPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...baseRules,
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-no-target-blank": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      prettier,
      security: securityPlugin,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      ...baseRules,
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
          filter: {
            regex: "^(Props|Render|RenderResult|RenderedContent)$",
            match: false,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/sort-type-constituents": "error",
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      astro: astroPlugin,
      "@typescript-eslint": tseslintPlugin,
      prettier,
      security: securityPlugin,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      ...baseRules,
      ...astroPlugin.configs.all.rules,
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
          filter: {
            regex: "^(Props|StringTitleProp|ArrayTitleProp)$",
            match: false,
          },
        },
      ],
    },
  },
];
