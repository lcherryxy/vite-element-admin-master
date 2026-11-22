<template>
  <NestedDemoPage
    title="Menu 1-3"
    level="一级子页面"
    desc="这是 /nested/menu1 下的第三个一级子路由页面，与 Menu 1-1、Menu 1-2 并列。点击左侧菜单切换时，仅 router-view 中的内容区域发生变化。"
    route-path="/nested/menu1/menu1-3"
    :rows="rows"
  />
</template>

<script setup>
import NestedDemoPage from '../../components/NestedDemoPage.vue'

const rows = [
  { name : 'Menu 1', path : '/nested/menu1', note : '父级路由，承载子路由的容器页面' },
  { name : 'Menu 1-1', path : '/nested/menu1/menu1-1', note : '同级一级子路由' },
  { name : 'Menu 1-2', path : '/nested/menu1/menu1-2', note : '同级一级子路由，内部继续嵌套' },
  { name : 'Menu 1-3', path : '/nested/menu1/menu1-3', note : '当前页面，一级子路由' }
]

defineOptions( {
  name : 'Menu1-3'
} )
</script>
