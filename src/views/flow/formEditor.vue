<template>
  <EditorShowcase
    title="表单编辑器 - vue-form-create2"
    subtitle="基于 vue-form-create2 的可视化表单设计器与表单生成器，支持拖拽布局，并可通过 JSON 配置快速渲染表单。"
    doc-link="https://www.npmjs.com/package/vue-form-create2"
    doc-text="使用文档"
    panel-title="表单设计器 / 生成器"
  >
    <div class="form-section">
      <div class="form-section__title">El 表单设计器</div>
      <ElDesignForm v-loading="loading" class="form-section__body" />
    </div>

    <div class="form-section">
      <div class="form-section__title">El 表单生成器</div>
      <ElGenerateForm :data="generateJson" class="form-section__body" />
    </div>
  </EditorShowcase>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import EditorShowcase from './components/EditorShowcase.vue'
import { loadJS } from '@/utils/loader'
import generateJson from './components/generateJson.json'
import { ElDesignForm, ElGenerateForm } from 'vue-form-create2'

const loading = ref( true )

// 动态加载 Ace Editor（代码编辑器），加载失败不影响表单设计器本身的使用
onBeforeMount( async() => {
  try {
    await loadJS( 'https://unpkg.com/ace-builds/src-noconflict/ace.js' )
  } catch ( e ) {
    // 忽略加载失败，仅代码编辑能力不可用
  } finally {
    loading.value = false
  }
} )

defineOptions( {
  name : 'FormEditor'
} )
</script>

<style lang="scss" scoped>
.form-section {
  width: 100%;
  max-width: 100%;

  & + & {
    margin-top: 16px;
  }

  &__title {
    margin-bottom: 10px;
    color: var(--app-text-regular);
    font-size: 14px;
    font-weight: 600;
  }

  &__body {
    width: 100%;
    height: 600px;
  }
}

@media (max-width: 767px) {
  .form-section__body {
    height: 460px;
  }
}
</style>
