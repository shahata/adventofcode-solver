import globals from "globals";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import typescript from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  eslint.configs.recommended,
  vitest.configs.recommended,
  ...typescript.configs.recommended,
  prettier,
  { languageOptions: { globals: globals.browser } },
  { rules: { "prefer-template": "error" } },
];
