/**
 * Axios 五件套（当前公司主流封装）：
 *   1. 请求取消：pendingMap + AbortController，相同请求重复时取消旧的
 *   2. 防重复提交：loadingMap 锁，接口未返回前不重复发
 *   3. 全局 loading：loadingCount 计数器，第一个请求 show、最后一个 hide
 *   4. 错误重试：retryCount=2，网络错误/超时/5xx 自动重试，4xx 不重试
 *   5. 保留原有：断网检查、token注入、文件流放行、白名单码、登录失效处理
 */
import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { getEnvs } from './envs'
import { getCookie } from '@/utils/cookies'
import router from '@/router'
import { useUserStore } from '@/store'
import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE, GLOBAL_DATA } from '@/config/constant'

// ========== 全局配置 ==========
const MAX_RETRY_COUNT = 2          // 错误重试次数（网络/超时/5xx）
const RETRY_DELAY = 1000           // 重试间隔（毫秒）
const CANCEL_DUPLICATE = true      // 相同请求是否取消旧的（true=取消旧的，false=防重复提交）

// ========== Dev 环境 Mock（替代已删除的 vite-plugin-mock） ==========
// 真实后端部署后把 MOCK_ENABLED 改为 false 即可切回代理模式
const MOCK_ENABLED = true
const MOCK_DELAY = 300              // mock 响应延迟（毫秒），模拟网络感
const AVATAR_MOCK = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
const mockApis = {
  '/login': () => ({ code: 200, data: { token: 'mock-token-vue3-admin' } }),
  '/getUserInfo': () => ({
    code: 200,
    data: {
      id: '9527',
      name: '灰是小灰灰的灰',
      avatar: AVATAR_MOCK,
      roles: ['editor', 'admin'],
      phone: '15988888888',
      email: '454539387@qq.com',
      identity: ''
    }
  }),
  '/logout': () => ({ code: 200, data: {} }),
  '/v1/user/list': () => ({ code: 200, data: { list: [] } }),
  '/login/history': () => ({ code: 200, data: [] }),
  '/article/list': (cfg) => {
    // 生成可编辑表格的 mock 列表数据
    const params = cfg?.params || {}
    const page = Number(params.page) || 1
    const limit = Number(params.limit) || 10
    const statuses = ['published', 'draft', 'deleted']
    const titles = [
      'Vue3 + Vite 构建后台管理系统实践',
      'Pinia 状态管理最佳实践',
      'Element Plus 组件库使用指南',
      'vxe-table 虚拟滚动性能优化',
      'ECharts 5 数据可视化方案',
      '前端工程化与构建优化',
      'TypeScript 类型体操进阶',
      '微前端架构 qiankun 实战',
      '响应式布局与 Tailwind CSS',
      'Node.js 服务端性能调优',
      'Webpack 5 模块联邦原理',
      'Vite 插件开发入门'
    ]
    const list = Array.from({ length: limit }, (_, i) => {
      const idx = (page - 1) * limit + i
      return {
        id: idx + 1,
        timestamp: Date.now() - idx * 86400000,
        author: ['张三', '李四', '王五', '赵六'][idx % 4],
        importance: (idx % 5) + 1,
        pageviews: Math.floor(Math.random() * 9000) + 1000,
        status: statuses[idx % 3],
        title: titles[idx % titles.length]
      }
    })
    return { code: 200, data: { items: list, total: 100 } }
  },
  '/article/detail': (cfg) => {
    const id = cfg?.params?.id || 1
    return {
      code: 200,
      data: {
        id,
        title: '文章详情标题 #' + id,
        content: '这是文章 #' + id + ' 的详细内容。',
        author: '张三',
        timestamp: Date.now(),
        status: 'published'
      }
    }
  },
  '/article/pv': (cfg) => {
    const pv = cfg?.params?.pv || 0
    return { code: 200, data: { pv: Number(pv) + 1 } }
  },
  '/article/create': (cfg) => {
    const data = cfg?.data || {}
    return { code: 200, data: { id: Date.now(), ...data } }
  },
  '/article/update': (cfg) => {
    const data = cfg?.data || {}
    return { code: 200, data: { ...data } }
  },
  '/test': () => ({ code: 200, data: 'ok' })
  
}
function setupMock(config) {
  if (!import.meta.env.DEV || !MOCK_ENABLED) return
  const base = config.baseURL || ''
  const rawPath = config.url.replace(new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '')
  const path = rawPath.startsWith('/') ? rawPath : '/' + rawPath
  const handler = mockApis[path]
  if (!handler) return
  config.adapter = (cfg) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: handler(cfg), status: 200, statusText: 'OK', headers: {}, config: cfg, request: {} })
      }, MOCK_DELAY)
    })
  }
}

// ========== 状态管理 ==========
const pendingMap = new Map()        // 请求 key → AbortController（用于取消）
const loadingMap = new Map()        // 请求 key → boolean（用于防重复提交）
let loadingCount = 0                // 全局 loading 计数器
let loadingInstance = null          // 全局 loading 实例

function getBaseURL() {
  const { envStr } = getEnvs()
  return envStr === 'dev' ? import.meta.env.VITE_PROXY_DOMAIN : GLOBAL_DATA[envStr].baseUrl
}

// 生成请求唯一 key（method + url + params + data）
function getRequestKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// ========== 1. 请求取消 ==========
function addPending(config) {
  if (!CANCEL_DUPLICATE) return
  const key = getRequestKey(config)
  cancelPending(key) // 先取消同 key 的旧请求
  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(key, controller)
}
function removePending(config) {
  const key = getRequestKey(config)
  pendingMap.delete(key)
}
function cancelPending(key) {
  if (pendingMap.has(key)) {
    pendingMap.get(key).abort()
    pendingMap.delete(key)
  }
}

// ========== 2. 防重复提交 ==========
function isDuplicate(config) {
  const key = getRequestKey(config)
  if (loadingMap.has(key)) return true
  loadingMap.set(key, true)
  return false
}
function finishLoading(config) {
  const key = getRequestKey(config)
  loadingMap.delete(key)
}

// ========== 3. 全局 loading ==========
function showGlobalLoading() {
  loadingCount++
  if (loadingCount === 1 && !loadingInstance) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.15)'
    })
  }
}
function hideGlobalLoading() {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }
}

// ========== 4. 错误重试 ==========
function shouldRetry(error) {
  const config = error.config
  if (!config || config.__retryCount >= MAX_RETRY_COUNT) return false
  // 4xx 不重试（客户端错误是业务问题）
  if (error.response && error.response.status >= 400 && error.response.status < 500) return false
  // 网络错误 / 超时 / 5xx 都重试
  return !error.response || error.response.status >= 500 || error.code === 'ECONNABORTED'
}
function retryRequest(error) {
  const config = error.config
  config.__retryCount = (config.__retryCount || 0) + 1
  // 退避延迟：1s, 2s（可改）
  const delay = RETRY_DELAY * config.__retryCount
  return new Promise(resolve => setTimeout(() => resolve(service.request(config)), delay))
}

// ========== Axios 实例 ==========
const HTTP_STATUS_MAP = {
  400: '错误请求', 401: '未授权，请重新登录', 403: '拒绝访问',
  404: '请求错误,未找到该资源', 405: '请求方法未允许',
  408: '请求超时', 500: '服务器端出错', 501: '网络未实现',
  502: '网络错误', 503: '服务不可用', 504: '网络超时', 505: 'http版本不支持该请求'
}

const service = axios.create({
  baseURL: getBaseURL(),
  timeout: 60 * 1000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// ========== Request 拦截器 ==========
service.interceptors.request.use((config) => {
  // Dev 环境 mock 拦截（在断网检查/loading/cancel 之前，mock 请求不走真实网络）
  setupMock(config)

  // 断网检查
  if (!navigator.onLine) {
    ElMessage({ message: '请检查您的网络是否正常', type: 'error', duration: 3000 })
    return Promise.reject(new Error('请检查您的网络是否正常'))
  }
  // 防重复提交
  if (CANCEL_DUPLICATE === false && isDuplicate(config)) {
    return Promise.reject(new Error('重复请求已拦截'))
  }
  // 1. 请求取消（AbortController）
  addPending(config)
  // 3. 全局 loading（文件流/上传不显示）
  if (!(config.data instanceof FormData) && !config.responseType) {
    showGlobalLoading()
  }
  // token 注入
  const token = getCookie(TOKEN)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => Promise.reject(error))

// ========== Response 拦截器 ==========
service.interceptors.response.use(
  (res) => {
    // 清理 1/2/3
    removePending(res.config)
    finishLoading(res.config)
    if (!(res.config.data instanceof FormData) && !res.config.responseType) {
      hideGlobalLoading()
    }
    const result = res.data
    const type = Object.prototype.toString.call(result)
    // 文件流放行
    if (type === '[object Blob]' || type === '[object ArrayBuffer]') return result
    // 业务码判断
    const { code, message } = result
    const isErrorToken = LOGIN_ERROR_CODE.find(item => item.code == code)
    const isWhiteCode = WHITE_CODE_LIST.find(item => item.code == code)
    const userStore = useUserStore()
    if (isErrorToken) {
      userStore.loginOut()
      router.push('/login')
      window.location.reload()
      return Promise.reject(new Error(message || '登录已失效'))
    }
    if (!isWhiteCode) {
      ElMessage({ message: message || 'Error', type: 'error', duration: 3000 })
      return Promise.reject(new Error(message || 'Error'))
    }
    return result
  },
  (error) => {
    // 清理 1/2/3
    if (error.config) {
      removePending(error.config)
      finishLoading(error.config)
      hideGlobalLoading()
    }
    // 4. 自动重试
    if (shouldRetry(error)) {
      return retryRequest(error)
    }
    // 用户手动取消（AbortController abort 触发）不弹错误
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    if (error?.response) {
      error.message = HTTP_STATUS_MAP[error.response.status] || '连接错误'
    }
    const isTimeout = error.message?.includes('timeout')
    ElMessage({
      message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
      type: 'error', duration: 2000
    })
    return Promise.reject(new Error(error.message))
  }
)

// ========== 导出 API ==========
export function get(url, params, config = {}) {
  return service.get(url, { params, ...config })
}
export function post(url, data, config = {}) {
  return service.post(url, data, config)
}
export function put(url, data, config = {}) {
  return service.put(url, data, config)
}
export function del(url, params, config = {}) {
  return service.delete(url, { params, ...config })
}

// 手动取消某个请求（面试亮点：暴露 API 给业务层调用）
export function cancelRequest(key) {
  cancelPending(key)
}
// 取消所有待处理请求（退出登录时调用）
export function cancelAllRequests() {
  pendingMap.forEach(controller => controller.abort())
  pendingMap.clear()
}

export default service
