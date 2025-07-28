// lint-staged.config.js
export default {
  '**/*.ts?(x)': [() => 'tsc -p tsconfig.json --noEmit', 'eslint --fix'],
  '*.{js,jsx,ts,tsx,json}': 'prettier --write',
};
