<template>
  <!-- Element Plus：ElConfigProvider 统一配置组件库语言和控件尺寸 -->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore, useSettingsStore } from '@/store'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const locale = computed(() => (appStore.lang === 'zh' ? zh : en))
const size = computed(() => appStore.size)

// 「跟随系统」模式下，系统外观切换时同步状态（html 上的 dark 类由 utils/theme 负责）
let mediaQuery = null
const handleSystemThemeChange = () => {
  settingsStore.syncSystemTheme()
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  mediaQuery && mediaQuery.removeEventListener('change', handleSystemThemeChange)
})

defineOptions({ name: 'App' })

</script>
