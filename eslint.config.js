import globals from 'globals';
import eslint from '@eslint/js';
import jest from 'eslint-plugin-jest';
import typescript from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  eslint.configs.recommended,
  jest.configs['flat/recommended'],
  ...typescript.configs.recommended,
  prettier,
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      'array-callback-return': 'error',
      'no-useless-assignment': 'error',
    },
  },
];
