<template>
  <EditorShowcase
    title="富文本编辑器 - TinyMCE"
    :subtitle="subtitle"
    doc-link="https://www.tiny.cloud/docs/"
    doc-text="官方文档"
    panel-title="TinyMCE"
  >
    <YuTinymce :value="form.contents" :height="500" @input="getEditorContent" />
  </EditorShowcase>
</template>

<script setup>
import { reactive } from 'vue'
import YuTinymce from '@/components/YuTinymce'
import EditorShowcase from './components/EditorShowcase.vue'

const form = reactive( {
  contents : '初始内容填充'
} )

const subtitle = 'TinyMCE 是一款易用、且功能强大的所见即所得的富文本编辑器。同类程序有：UEditor、Kindeditor、Simditor、CKEditor、wangEditor、Suneditor、froala 等等。'

// 富文本更新内容
const getEditorContent = info => {
  form.contents = info
}

defineOptions( {
  name : 'Editor'
} )
</script>
