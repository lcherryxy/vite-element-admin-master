<template>
  <div class="screen-full">
    <FullScreen v-if="!isFullscreen" class="icons" @click="click" />
    <svg-icon v-else class-name="icons" icon-class="exit-fullscreen" @click="click" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// Element Plus：浏览器不支持全屏时用 ElMessage 警告
import { ElMessage } from 'element-plus'
// screenfull：封装 Fullscreen API，切换浏览器全屏
import screenfull from 'screenfull'
const isFullscreen = ref( false )

onMounted( () => {
  init()
} )

onUnmounted( () => {
  destory()
} )

const click = () => {
  if ( !screenfull.isEnabled ) {
    ElMessage( {
      message : '你的浏览器不支持全屏',
      type : 'warning'
    } )
    return false
  }
  screenfull.toggle()
}
const init = () => {
  if ( screenfull.isEnabled ) {
    screenfull.on( 'change', change )
  }
}
const destory = () => {
  if ( screenfull.isEnabled ) {
    screenfull.off( 'change', change )
  }
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

defineOptions( {
  name : 'Screenfull'
} )
</script>

<style scoped lang="scss">
.screen-full {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
    background: #f0f0f0;
  }
  /* EP 图标直接渲染 svg，需要显式尺寸（等同于原 svg-icon 的 1em） */
  .icons {
    width: 1em;
    height: 1em;
    display: inline-block;
  }
}
</style>
