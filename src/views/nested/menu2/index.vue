<template>
  <NestedDemoPage
    title="Menu 2"
    level="一级页面"
    desc="这是 /nested 下与 menu1 并列的一级子路由页面，没有继续嵌套子路由。嵌套路由既可以像 menu1 那样多层嵌套，也可以像本页一样作为普通叶子页面使用。"
    route-path="/nested/menu2"
    :rows="rows"
  />
</template>

<script setup>
import NestedDemoPage from '../components/NestedDemoPage.vue'

const rows = [
  { name : 'Nested', path : '/nested', note : '顶级父路由，容器页面' },
  { name : 'Menu 1', path : '/nested/menu1', note : '一级子路由，内部包含多层嵌套' },
  { name : 'Menu 2', path : '/nested/menu2', note : '当前页面，一级子路由（叶子页面）' }
]

defineOptions( {
  name : 'Menu2'
} )
</script>
