/**
 * mitt：轻量事件总线。组件间跨层级通信用 emit / on，不再挂 $pub / $sub。
 */
import mitt from 'mitt'

export const emitter = mitt()

export default {
  install(app) {
    app.config.globalProperties.$emitter = emitter
  }
}
