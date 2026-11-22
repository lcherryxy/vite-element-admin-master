<template>
  <div class="menu1-wrapper">
    <el-alert :closable="false" title="menu 1-2" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style scoped>
.menu1-wrapper {
  padding: 30px;
}
</style>
