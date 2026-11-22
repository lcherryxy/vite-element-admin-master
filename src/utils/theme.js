/**
 * 主题模式：light 亮色 / dark 暗色
 * 统一读写 localStorage，并同步 html 上的 dark 类，供 Element Plus 与自定义变量使用
 */
import { localStorageHandle } from '@/utils/storage'

const THEME_KEY = 'themeMode'

export const THEME_MODES = ['light', 'dark']

/** 读取本地保存的主题模式，非法值（含旧的 auto）回退亮色 */
export function getThemeMode() {
  const mode = localStorageHandle.getItem(THEME_KEY)
  return THEME_MODES.includes(mode) ? mode : 'light'
}

/** 判断某个模式是否为暗色 */
export function isDarkTheme(mode) {
  return mode === 'dark'
}

/** 把主题应用到 html 根节点，浏览器主题色一并同步 */
export function applyTheme(mode) {
  const dark = isDarkTheme(mode)
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.setAttribute('data-theme', dark ? 'dark' : 'light')

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) {
    themeColor.setAttribute('content', dark ? '#141414' : '#ffffff')
  }
}

/** 保存并立即应用主题模式 */
export function saveThemeMode(mode) {
  const valid = THEME_MODES.includes(mode) ? mode : 'light'
  localStorageHandle.setItem(THEME_KEY, valid)
  applyTheme(valid)
}

/** 应用启动时初始化主题 */
export function initTheme() {
  applyTheme(getThemeMode())
}
