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
