import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  source: {
    entry: {
      index: './src/festo/index.tsx',
    },
  },
  plugins: [pluginReact(), pluginSass()],
});
