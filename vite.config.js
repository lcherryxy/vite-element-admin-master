
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { getEnv, regExps } from './config'
import { composePlugins } from './config/plugins'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 过滤第三方库产生的无害 console 警告
// 注意：echarts-gl 的 geo3D exists 等警告已在 index.html 里拦截（浏览器端最先执行）
function suppressCssWarnings() {
  return {
    name: 'suppress-css-warnings',
    configResolved(config) {
      const originalWarn = console.warn
      // Node 端（Vite 构建时）的 esbuild CSS minify 警告
      const suppressedPatterns = [
        'backbround-color',
        'unsupported-css-nesting',
        'Expected identifier but found whitespace',
        'Unexpected ";"',
        '*display: inline'
      ]
      console.warn = (...args) => {
        const msg = args.join(' ')
        if (suppressedPatterns.some((p) => msg.includes(p))) {
          return
        }
        originalWarn.apply(console, args)
      }
      process.on('exit', () => {
        console.warn = originalWarn
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = getEnv(loadEnv(mode, process.cwd()))
  const { VITE_PORT, VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = env
  return {
    root,
    // dev 模式用 '/'（绝对路径，根路径能正常返回 index.html），
    // build 模式用 './'（相对路径，支持子目录部署，如 http://example.com/admin/）
    base: command === 'build' ? './' : '/',
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.js', '.json', '.ts', '.vue']
    },

    // Vite dev：预打包 echarts/echarts-gl，避免 HMR 时重复触发副作用注册
    // echarts-gl 的 geo3D/scatter3D 等组件注册是 idempotent 的，但会 console.warn
    optimizeDeps: {
      include: ['echarts', 'echarts-gl']
    },

    plugins: [suppressCssWarnings(), ...composePlugins(command)],

    server: {
      host: '0.0.0.0',
      port: VITE_PORT || 9527,
      https: false,
      open: false,
      // Chrome 已默认弃用 unload 事件，TinyMCE 内部注册的 unload 监听会刷
      // [Violation] Permissions policy violation: unload is not allowed in this document
      // 通过官方豁免头重新允许 unload（编辑器 iframe 同源，自动继承此策略）
      // 生产环境需在部署服务器（如 nginx）加同样的响应头
      headers: {
        'Permissions-Policy': 'unload=*'
      },
      proxy: {
        [VITE_PROXY_DOMAIN]: {
          target: VITE_PROXY_DOMAIN_REAL,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => regExps(path, VITE_PROXY_DOMAIN)
        }
      }
    },

    define: {
      // https://vue-i18n.intlify.dev/guide/advanced/optimization.html#quasar-cli
      // 注意：legacy API 必须开启！Element Plus 2.14.x 内部依赖 vue-i18n legacy API
      // 如果关掉会导致 el-config-provider locale 处理时出现 undefined.toUpperCase 等错误
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        version: '3.0.0'
      })
    },

    esbuild: {
      logLevel: 'silent'
    },

    build: {
      path: './',
      sourcemap: false,
      brotliSize: false,
      chunkSizeWarningLimit: 2500,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const chunkName = id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
              // 小包 / 间接依赖 合并到 vendor，避免空 chunk 警告
              const smallPackages = [
                '@petamoriken', 'earcut', 'ieee754', 'lerc', 'pako',
                'pbf', 'quick-lru', 'web-worker', 'xml-utils',
                'tinyqueue', 'rbush', 'murmurhash-js', 'quickselect'
              ]
              if (smallPackages.includes(chunkName)) {
                return 'vendor'
              }
              return chunkName
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          }
        }
      }
    }
  }
})
