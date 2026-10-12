<template>
  <!--  <p class="test">{{ $t('header.home') }}</p>-->
  <!-- Element Plus：ElConfigProvider 统一配置组件库语言和控件尺寸 -->
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
// Element Plus：根节点配置组件，内部所有 el-* 都会吃到 locale / size
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useAppStore } from '@/store'

defineOptions( {
  name : 'App',
  components : {
    [ElConfigProvider.name] : ElConfigProvider
  }
} )

const appStore = useAppStore()
const locale = computed( () => ( appStore.lang === 'zh' ? zh : en ) )
const size = computed( () => appStore.size )
</script>
