<template>
  <EditorShowcase
    title="图片编辑器 - Tui Image Editor"
    subtitle="基于 TOAST UI 的图片编辑器，支持裁剪、翻转、旋转、绘画、形状、图标、文字、滤镜等操作。手机端可在编辑器内部横向滚动查看完整工具栏。"
    doc-link="http://nhn.github.io/tui.image-editor/latest/"
    doc-text="使用文档"
    panel-title="ImageEditor"
  >
    <ImageEditor ref="editor" />
  </EditorShowcase>
</template>

<script setup>
import { ref } from 'vue'
import EditorShowcase from './components/EditorShowcase.vue'
import ImageEditor from '@/components/YuImageEditor'

const editor = ref()

defineOptions( {
  name : 'ImageEditor'
} )
</script>
