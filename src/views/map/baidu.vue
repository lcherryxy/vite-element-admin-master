<template>
  <yu-layout title="百度地图">
    <template #head>
      百度地图的简单使用，最新版GL地图命名空间为BMapGL, 可按住鼠标右键控制地图旋转、修改倾斜角度。
      <el-link
        type="primary"
        href="https://lbsyun.baidu.com/index.php?title=jspopularGL"
        target="_blank"
        :underline="false"
        >点我查看更多</el-link
      >
    </template>
    <template #body>
      <div class="section-container">
        <div id="container" ref="container"></div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { baiduMap } from './utils'
import YuLayout from '@/components/YuLayout'

const container = ref()
const ak = 'ov7zC5g8Ac0ScLPp1zG8TZDuiGfty9Hh'

// 百度地图 JS API 动态加载后初始化地图
onMounted( async () => {
  await nextTick()
  try {
    await baiduMap( ak )
    // BMap 由百度 SDK 全局注入
    const map = new BMap.Map( container.value )
    map.centerAndZoom( new BMap.Point( 116.404, 39.915 ), 11 )
    map.addControl(
      new BMap.MapTypeControl( {
        mapTypes : [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      } )
    )
    map.setCurrentCity( '北京' )
    map.enableScrollWheelZoom( true )
  } catch ( err ) {
    console.error( '百度地图加载失败', err )
  }
} )
</script>

<style lang="scss" scoped>
.info {
  height: 30px;
  line-height: 30px;
}
#container {
  width: 100vw;
  height: calc(100vh - 120px);
}
</style>
