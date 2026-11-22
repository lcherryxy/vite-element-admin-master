<template>
  <NestedDemoPage
    title="Menu 1-2-2"
    level="三级子页面"
    desc="与 Menu 1-2-1 同级的三级子路由页面，演示同一父路由下可以挂载多个并列的子页面，通过左侧菜单切换时父级容器保持不变。"
    route-path="/nested/menu1/menu1-2/menu1-2-2"
    :rows="rows"
  />
</template>

<script setup>
import NestedDemoPage from '../../../components/NestedDemoPage.vue'

const rows = [
  { name : 'Menu 1', path : '/nested/menu1', note : '一级父路由' },
  { name : 'Menu 1-2', path : '/nested/menu1/menu1-2', note : '二级父路由' },
  { name : 'Menu 1-2-1', path : '/nested/menu1/menu1-2/menu1-2-1', note : '同级的另一个三级子路由' },
  { name : 'Menu 1-2-2', path : '/nested/menu1/menu1-2/menu1-2-2', note : '当前页面，三级子路由' }
]

defineOptions( {
  name : 'Menu1-2-2'
} )
</script>
