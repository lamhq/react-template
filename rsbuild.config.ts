import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    entry: {
      index: './src/state/index.tsx',
    },
  },
  plugins: [pluginReact()],
});
