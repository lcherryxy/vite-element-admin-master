import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { svgBuilder } from '../config/svgBuilder.js'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function composePlugins(command) {
  const lifecycle = process.env.npm_lifecycle_event
  return [
    vue(),
    DefineOptions(),
    vueJsx(),
    // SVG 自动注册：把 src/icons/svg/ 下所有 svg 转为 symbol 注入 body
    svgBuilder('./src/icons/svg/'),
    // rollup-plugin-visualizer：npm run vis 时生成体积报告
    lifecycle === 'report'
      ? visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'report.html'
      })
      : null
  ].filter(Boolean)
}
