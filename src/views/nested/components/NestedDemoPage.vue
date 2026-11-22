<template>
  <div class="nested-demo">
    <el-card shadow="never" class="nested-demo__card">
      <template #header>
        <div class="nested-demo__header">
          <span class="nested-demo__title">{{ title }}</span>
          <el-tag size="small" type="info">{{ level }}</el-tag>
        </div>
      </template>

      <p class="nested-demo__desc">{{ desc }}</p>

      <el-alert
        type="info"
        :closable="false"
        show-icon
        class="nested-demo__path"
      >
        <template #title>
          当前路由：<code>{{ routePath }}</code>
        </template>
      </el-alert>

      <el-table :data="rows" stripe size="small" class="nested-demo__table">
        <el-table-column prop="name" label="页面" width="180" />
        <el-table-column prop="path" label="路由路径" width="260" />
        <el-table-column prop="note" label="说明" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
defineOptions( {
  name : 'NestedDemoPage'
} )

defineProps( {
  title : {
    type : String,
    required : true
  },
  level : {
    type : String,
    default : ''
  },
  desc : {
    type : String,
    default : ''
  },
  routePath : {
    type : String,
    default : ''
  },
  rows : {
    type : Array,
    default : () => []
  }
} )
</script>

<style lang="scss" scoped>
.nested-demo {
  width: 100%;

  &__card {
    border-radius: 10px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--app-text-primary);
  }

  &__desc {
    margin: 0 0 14px;
    color: var(--app-text-regular);
    font-size: 14px;
    line-height: 1.7;
  }

  &__path {
    margin-bottom: 16px;

    code {
      padding: 2px 6px;
      background: var(--app-fill-color-light);
      border-radius: 4px;
      font-size: 13px;
    }
  }

  &__table {
    width: 100%;
  }
}
</style>
