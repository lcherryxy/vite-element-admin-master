import { defineStore } from 'pinia'
import variables from '@/styles/element-variables.scss?inline'
import { localStorageHandle } from '@/utils/storage'
import { getThemeMode, isDarkTheme, saveThemeMode } from '@/utils/theme'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const useSettingsStore = defineStore('settings', {
  state: () => {
    const localTagsView = localStorageHandle.getItem('tagsView')
    const localFixedHeader = localStorageHandle.getItem('fixedHeader')
    const localSidebarLogo = localStorageHandle.getItem('sidebarLogo')
    return {
      theme: variables.theme,
      showSettings,
      tagsView: localTagsView ? !!+localTagsView : tagsView,
      fixedHeader: localFixedHeader ? !!+localFixedHeader : fixedHeader,
      sidebarLogo: localSidebarLogo ? !!+localSidebarLogo : sidebarLogo,
      layoutMod: localStorageHandle.getItem('layoutMod') == 'horizontal' ? 'horizontal' : 'vertical',
      // 主题模式：light | dark | auto，isDark 为当前实际呈现状态
      themeMode: getThemeMode(),
      isDark: isDarkTheme(getThemeMode())
    }
  },
  actions: {
    changeSetting({ key, value }) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = value
        localStorageHandle.setItem(key, +value)
      }
    },
    changeLayoutMod(val = 'vertical') {
      const mod = val == 'vertical' ? 'vertical' : 'horizontal'
      localStorageHandle.setItem('layoutMod', mod)
      this.layoutMod = mod
    },
    changeThemeMode(mode) {
      this.themeMode = mode
      this.isDark = isDarkTheme(mode)
      saveThemeMode(mode)
    },
    toggleTheme() {
      this.changeThemeMode(this.isDark ? 'light' : 'dark')
    },
    // 跟随系统模式下，系统外观变化时同步状态
    syncSystemTheme() {
      if (this.themeMode !== 'auto') return
      this.isDark = isDarkTheme('auto')
    }
  }
})

export default useSettingsStore
