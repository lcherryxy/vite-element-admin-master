<template>
  <EditorShowcase
    title="富文本编辑器 - WangEditor"
    subtitle="wangEditor 是一款开源 Web 富文本编辑器，支持常见的文本编辑能力与自定义菜单，体积小、上手快。"
    doc-link="https://www.wangeditor.com/v5/getting-started.html"
    doc-text="使用文档"
    panel-title="WangEditor"
  >
    <div class="wangeditor-box">
      <Toolbar class="wangeditor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        class="wangeditor-content"
        :style="{ height: 'var(--wangeditor-height, 500px)' }"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </EditorShowcase>
</template>

<script setup>
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import EditorShowcase from './components/EditorShowcase.vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()

// const mode = 'default' // simple
const mode = 'simple' // default

// 初始内容 HTML
const valueHtml = ref( '<p>我乃万人迷石榴姐</p>' )

// 模拟 ajax 异步获取内容
onMounted( () => {
  setTimeout( () => {
    valueHtml.value = '<p>我乃华府小书童：华安</p>'
  }, 1500 )
} )

const toolbarConfig = {}
const editorConfig = { placeholder : '9527，你就没什么想对秋香说的吗？' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount( () => {
  const editor = editorRef.value
  if ( editor == null ) return
  editor.destroy()
} )

const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

defineOptions( {
  name : 'Wangeditor'
} )
</script>

<style lang="scss" scoped>
.wangeditor-box {
  --wangeditor-height: 500px;
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--app-border-color-light);
  border-radius: 6px;
  overflow: hidden;
}

.wangeditor-toolbar {
  border-bottom: 1px solid var(--app-border-color-light);
  max-width: 100%;
  overflow-x: auto;
}

.wangeditor-content {
  width: 100%;
  max-width: 100%;
  overflow-y: hidden;
  background: var(--app-panel-bg);
}

@media (max-width: 767px) {
  .wangeditor-box {
    --wangeditor-height: 360px;
  }
}
</style>
