<template>
  <EditorShowcase
    title="Markdown 编辑器 - Vditor"
    subtitle="Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染与分屏预览，适合写作与文档编辑场景。"
    doc-link="https://ld246.com/article/1549638745630"
    doc-text="使用文档"
    panel-title="Vditor"
  >
    <div id="vditor" class="vditor-box" />
  </EditorShowcase>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import EditorShowcase from './components/EditorShowcase.vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref( null )

onMounted( () => {
  vditor.value = new Vditor( 'vditor', {
    height : 360,
    placeholder : '9527，你就没什么想对秋香说的吗？',
    toolbarConfig : {
      pin : true
    },
    cache : {
      enable : false
    },
    after : () => {
      // vditor.value 此时已可用
    }
  } )
} )

// 离开页面时销毁实例，避免重复初始化
onBeforeUnmount( () => {
  vditor.value?.destroy()
  vditor.value = null
} )

defineOptions( {
  name : 'Vditor'
} )
</script>

<style lang="scss" scoped>
.vditor-box {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}
</style>
