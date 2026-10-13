/**
 * mitt：轻量事件总线。组件间跨层级通信直接 import { emitter } 使用。
 */
import mitt from 'mitt'

export const emitter = mitt()

export default emitter

