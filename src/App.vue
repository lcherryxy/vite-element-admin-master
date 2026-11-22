<template>
  <!-- Element Plus：ElConfigProvider 统一配置组件库语言和控件尺寸 -->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const locale = computed(() => (appStore.lang === 'zh' ? zh : en))
const size = computed(() => appStore.size)

defineOptions({ name: 'App' })
</script>
