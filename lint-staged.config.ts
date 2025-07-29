import { type Configuration } from 'lint-staged';

const config: Configuration = {
  '**/*.ts?(x)': 'eslint --fix',
  '*.{js,jsx,ts,tsx,json}': 'prettier --write',
};

export default config;
