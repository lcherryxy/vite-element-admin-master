import { defineStore } from 'pinia'
import { getCookie, setCookie } from '@/utils/cookies'

const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: getCookie('sidebarStatus') ? !!+getCookie('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: getCookie('size') || 'default',
    lang: getCookie('lang') || 'zh'
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      setCookie('sidebarStatus', this.sidebar.opened ? 1 : 0)
    },
    closeSidebar(withoutAnimation) {
      setCookie('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device) {
      this.device = device
    },
    // 设备类型：desktop | tablet | mobile
    setDevice(device) {
      this.device = device
    },
    // 设备切换时直接设置侧边栏开合，不写入 cookie，避免影响 PC 端偏好
    setSidebarOpened(opened, withoutAnimation = true) {
      this.sidebar.opened = opened
      this.sidebar.withoutAnimation = withoutAnimation
    },
    setSize(size) {
      this.size = size
      setCookie('size', size)
    },
    setLang(lang) {
      this.lang = lang
      setCookie('lang', lang)
    }
  }
})

export default useAppStore
