import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
// @ts-ignore
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      mixedImport: true,
    }),
  ],
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'build',
    },
  },
  tools: {
    bundlerChain(chain) {
      if (process.env.ANALYZE === 'true') {
        chain
          .plugin('bundle-analyzer')
          .use(BundleAnalyzerPlugin, [{ analyzerMode: 'server' }]);
      }
    },
  },
});
