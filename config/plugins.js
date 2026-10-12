
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteMockServe } from 'vite-plugin-mock'
import { svgBuilder } from '../config/svgBuilder.js'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function composePlugins(command, VITE_LEGACY) {
  const prodMock = true
  const lifecycle = process.env.npm_lifecycle_event
  return [
    vue(),
    DefineOptions(),
    vueJsx(),
    svgBuilder('./src/icons/svg/'),
    // https://www.npmjs.com/package/@vitejs/plugin-legacy
    VITE_LEGACY
      ? legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
      : null,
    // https://www.npmjs.com/package/rollup-plugin-visualizer
    lifecycle === 'report'
      ? visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'report.html'
      })
      : null,

    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      supportTs: false,
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    })
  ]
}
