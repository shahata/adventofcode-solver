import globals from "globals";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  eslint.configs.recommended,
  vitest.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  { languageOptions: { globals: globals.browser } },
  { rules: { "prefer-template": "error" } },
);
