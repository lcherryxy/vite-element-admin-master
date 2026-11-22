<template>
  <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
// ECharts：init 容器后 setOption 画柱状图
import * as echarts from 'echarts'
import { shallowRef, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'

const animationDuration = 6000
const props = defineProps( {
  className : {
    type : String,
    default : 'chart'
  },
  width : {
    type : String,
    default : '100%'
  },
  height : {
    type : String,
    default : '300px'
  }
} )

// ECharts 实例必须用 shallowRef，深层响应式代理会影响 resize()
const chart = shallowRef( null )
const container = ref( null )

// 容器尺寸变化（窗口缩放、侧边栏折叠、设备档位切换）时自动重绘
useResizeObserver( container, useDebounceFn( () => {
  chart.value && chart.value.resize()
}, 100 ) )

const initChart = () => {
  chart.value = echarts.init( container.value )
  chart.value.setOption( {
    tooltip : {
      trigger : 'axis',
      axisPointer : {
        // 坐标轴指示器，坐标轴触发有效
        type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid : {
      top : 10,
      left : '2%',
      right : '2%',
      bottom : '3%',
      containLabel : true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick : {
          alignWithLabel : true
        }
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisTick : {
          show : false
        }
      }
    ],
    series : [
      {
        name : 'pageA',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      },
      {
        name : 'pageB',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      },
      {
        name : 'pageC',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }
    ]
  } )
}

onMounted( () => {
  nextTick( () => {
    initChart()
  } )
} )
onBeforeUnmount( () => {
  if ( !chart.value ) {
    return
  }
  chart.value.dispose()
  chart.value = null
} )

defineOptions( {
  name : 'BarChart'
} )
</script>
