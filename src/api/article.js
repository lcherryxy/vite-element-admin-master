// Axios：业务接口只调 get/post，统一走 request.js 创建的 axios 实例 + 拦截器
import { get, post } from '@/utils/request'

export function getArticle(params) {
  return get('/article/list', params)
}

export function getDetail(id) {
  return get('/article/detail', { id })
}

export function getPv(pv) {
  return get('/article/pv', { pv })
}

export function createArticle(data) {
  return post('/article/create', data)
}

export function updateArticle(data) {
  return post('/article/update', data)
}
