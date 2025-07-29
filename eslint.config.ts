import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import playwright from 'eslint-plugin-playwright';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default tseslint.config(
  includeIgnoreFile(gitignorePath, 'Imported `.gitignore` patterns'),
  globalIgnores(['public'], 'Ignore auto-generated code'),
  {
    name: 'Config files',
    files: ['**/*.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ...js.configs.recommended,
    name: 'JavaScript',
    files: ['**/*.{js,ts,jsx,tsx}'],
  },
  {
    name: 'TypeScript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce consistent usage of type assertions - prefer `type` over `interface` for consistency
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Disallow unused variables but allow parameters starting with underscore (common convention for intentionally unused params)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    name: 'TypeScript React',
    files: ['**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    extends: [
      reactPlugin.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    name: 'Vitest + React Testing Library',
    files: ['src/**/*.test.{ts,tsx}'],
    extends: [vitest.configs.recommended, testingLibrary.configs['flat/react']],
  },
  {
    ...playwright.configs['flat/recommended'],
    name: 'Playwright Tests',
    files: ['tests/**/*.spec.ts'],
  },
  ...storybook.configs['flat/recommended'],
  eslintConfigPrettier,
);
