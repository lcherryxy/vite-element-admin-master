<template>
  <NestedDemoPage
    title="Menu 1-1"
    level="一级子页面"
    desc="这是 /nested/menu1 下的第一个一级子路由页面。Vue Router 通过父级页面里嵌套的 router-view 渲染子路由，父级面包屑与当前子页面内容会同时展示。"
    route-path="/nested/menu1/menu1-1"
    :rows="rows"
  />
</template>

<script setup>
import NestedDemoPage from '../../components/NestedDemoPage.vue'

const rows = [
  { name : 'Menu 1', path : '/nested/menu1', note : '父级路由，承载子路由的容器页面' },
  { name : 'Menu 1-1', path : '/nested/menu1/menu1-1', note : '当前页面，一级子路由' },
  { name : 'Menu 1-2', path : '/nested/menu1/menu1-2', note : '一级子路由，内部继续嵌套二级子路由' }
]

defineOptions( {
  name : 'Menu1-1'
} )
</script>
