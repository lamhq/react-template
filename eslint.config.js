import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported `.gitignore` patterns'),
  globalIgnores(['public'], 'Ignore auto-generated code'),
  {
    name: 'Config files',
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: 'Javascript',
    files: ['**/*.{js,ts,jsx,tsx}'],
    extends: [js.configs.recommended],
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

      // used in unit tests, where mocking is required
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    name: 'TypeScript React',
    files: ['**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [
      reactPlugin.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
  },
  storybook.configs['flat/recommended'],
  eslintConfigPrettier,
]);
