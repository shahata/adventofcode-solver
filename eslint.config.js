import js from '@eslint/js';
import globals from 'globals';
import jest from 'eslint-plugin-jest';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  jest.configs['flat/recommended'],
  prettierRecommended,
  { languageOptions: { globals: globals.browser } },
];
