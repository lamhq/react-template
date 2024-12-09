import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

export default defineConfig({
  source: {
    entry: {
      index: './src/festo/index.tsx',
    },
  },
  plugins: [pluginReact(), pluginTypedCSSModules()],
});
