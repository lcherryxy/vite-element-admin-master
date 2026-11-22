<template>
  <NestedDemoPage
    title="Menu 1-2-1"
    level="三级子页面"
    desc="这是嵌套层级最深的三级子路由页面：/nested 下嵌套 menu1，menu1 下嵌套 menu1-2，menu1-2 下再嵌套 menu1-2-1。每一层父页面都通过 router-view 承载下一级内容。"
    route-path="/nested/menu1/menu1-2/menu1-2-1"
    :rows="rows"
  />
</template>

<script setup>
import NestedDemoPage from '../../../components/NestedDemoPage.vue'

const rows = [
  { name : 'Menu 1', path : '/nested/menu1', note : '一级父路由' },
  { name : 'Menu 1-2', path : '/nested/menu1/menu1-2', note : '二级父路由，继续包含子路由' },
  { name : 'Menu 1-2-1', path : '/nested/menu1/menu1-2/menu1-2-1', note : '当前页面，三级子路由' },
  { name : 'Menu 1-2-2', path : '/nested/menu1/menu1-2/menu1-2-2', note : '同级的另一个三级子路由' }
]

defineOptions( {
  name : 'Menu1-2-1'
} )
</script>
