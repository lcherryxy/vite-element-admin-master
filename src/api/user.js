// Axios：业务接口只调 get/post，不再写 http.request({ method, url })
import { get, post } from '@/utils/request'

export function UserList(data) {
  return post('/v1/user/list', data)
}

export function login(params) {
  return get('/login', params)
}

export function getInfo(params) {
  return get('/getUserInfo', params)
}

export function logout() {
  return get('/logout')
}

export function loginHistory() {
  return get('/login/history')
}

export function testRequest() {
  return get('/test')
}
