/**
 * 当前公司主流写法：axios.create 创建实例 + 拦截器 + 导出 get/post。
 * 不再用 class HttpRequest 包一层，面试项目里也不再推荐那种旧封装。
 */
import axios from 'axios'
// Element Plus：请求失败时用 ElMessage 弹出错误提示
import { ElMessage } from 'element-plus'
import { getEnvs } from './envs'
import { getCookie } from '@/utils/cookies'
import router from '@/router'
import { useUserStore } from '@/store'
import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE, GLOBAL_DATA } from '@/config/constant'

function getBaseURL() {
  const { envStr } = getEnvs()
  return envStr === 'dev' ? import.meta.env.VITE_PROXY_DOMAIN : GLOBAL_DATA[envStr].baseUrl
}

const HTTP_STATUS_MAP = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求'
}

// Axios：用 create 生成独立实例，拦截器和 timeout 只作用在这一份请求上
const service = axios.create({
  baseURL: getBaseURL(),
  timeout: 60 * 1000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(
  (config) => {
    // 开发调试：console.log(config) — 上线前删除
    if (!navigator.onLine) {
      ElMessage({
        message: '请检查您的网络是否正常',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error('请检查您的网络是否正常'))
    }
    const token = getCookie(TOKEN)
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (res) => {
    const result = res.data
    const type = Object.prototype.toString.call(result)

    if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
      return result
    }

    const { code, message } = result
    const isErrorToken = LOGIN_ERROR_CODE.find((item) => item.code == code)
    const isWhiteCode = WHITE_CODE_LIST.find((item) => item.code == code)
    const userStore = useUserStore()

    if (isErrorToken) {
      userStore.loginOut()
      router.push('/login')
      window.location.reload()
      return Promise.reject(new Error(message || '登录已失效'))
    }

    if (!isWhiteCode) {
      ElMessage({
        message: message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(message || 'Error'))
    }

    return result
  },
  (error) => {
    if (error?.response) {
      error.message = HTTP_STATUS_MAP[error.response.status] || '连接错误'
    }
    const isTimeout = error.message?.includes('timeout')
    ElMessage({
      message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(new Error(error.message))
  }
)

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

export default service
