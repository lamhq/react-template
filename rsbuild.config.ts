import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    entry: {
      index: './src/i18n/index.tsx',
    },
  },
  plugins: [pluginReact()],
});
