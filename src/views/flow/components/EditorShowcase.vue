<template>
  <YuLayout :title="title" :subtitle="subtitle">
    <template #head>
      <slot name="head" />
      <el-link
        v-if="docLink"
        class="editor-showcase__link"
        type="primary"
        :href="docLink"
        target="_blank"
        underline="never"
      >
        {{ docText }}
      </el-link>
    </template>
    <template #body>
      <div class="editor-showcase">
        <el-card class="editor-showcase__card" shadow="never">
          <template #header>
            <div class="editor-showcase__head">
              <span class="editor-showcase__name">{{ panelTitle }}</span>
              <slot name="extra" />
            </div>
          </template>
          <div class="editor-showcase__body">
            <slot />
          </div>
        </el-card>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import YuLayout from '@/components/YuLayout'

defineOptions( {
  name : 'EditorShowcase'
} )

defineProps( {
  // 页面标题
  title : {
    type : String,
    default : ''
  },
  // 页面简介，支持 HTML
  subtitle : {
    type : String,
    default : ''
  },
  // 卡片标题
  panelTitle : {
    type : String,
    default : ''
  },
  // 文档链接
  docLink : {
    type : String,
    default : ''
  },
  docText : {
    type : String,
    default : '点我查看更多'
  }
} )
</script>

<style lang="scss" scoped>
.editor-showcase {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  &__card {
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);

    :deep(.el-card__header) {
      padding: 14px 20px;
      border-bottom: 1px solid var(--app-border-color-light);
    }

    :deep(.el-card__body) {
      padding: 16px;
      max-width: 100%;
      box-sizing: border-box;
      /* 编辑器内容超宽时在卡片内滚动，不撑破页面 */
      overflow-x: auto;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__name {
    color: var(--app-text-primary);
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
  }

  &__link {
    margin-left: 8px;
    font-size: 13px;
  }

  &__body {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    /* 编辑器内容不超出卡片；图片编辑器保留自身最小宽度，由内部横向滚动承载 */
    :deep(.vditor),
    :deep(.tinymce-container),
    :deep(.w-e-toolbar),
    :deep(.w-e-text-container) {
      max-width: 100%;
    }

    /* TinyMCE 工具栏在小屏下横向滚动，避免整页溢出 */
    :deep(.mce-toolbar-grp),
    :deep(.mce-menubar) {
      max-width: 100%;
      overflow-x: auto;
    }
  }

  @media (max-width: 767px) {
    &__card {
      :deep(.el-card__header) {
        padding: 10px 12px;
      }

      :deep(.el-card__body) {
        padding: 10px;
      }
    }

    &__name {
      font-size: 14px;
    }
  }
}
</style>
