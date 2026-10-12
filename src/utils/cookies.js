/**
 * js-cookie：浏览器 Cookie 读写。
 * 用函数导出，不再套 class CookieProxy。
 */
import Cookies from 'js-cookie'
import { getEnvs } from '@/utils/envs'

const { hostname } = window.location

function getPrefix() {
  const { envStr } = getEnvs()
  if (envStr === 'dev' || envStr === 'fat') return 'fat_'
  if (envStr === 'uat') return 'uat_'
  return ''
}

const prefix = getPrefix()
const baseParams = {
  expires: 7,
  path: '/',
  domain: hostname || undefined
}

export function getCookie(key, hasPrefix = true) {
  return Cookies.get(hasPrefix ? `${prefix}${key}` : key)
}

export function setCookie(key, value, params = baseParams) {
  return Cookies.set(`${prefix}${key}`, value, params)
}

export function removeCookie(key, hasPrefix = true) {
  const keyStr = hasPrefix ? `${prefix}${key}` : key
  return Cookies.remove(keyStr, { path: '/', domain: hostname })
}

export function getAllCookies() {
  return Cookies.get()
}

export function clearAllCookies() {
  Object.keys(getAllCookies()).forEach((key) => {
    removeCookie(key, false)
  })
}
