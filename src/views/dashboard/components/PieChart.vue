<template>
  <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
// ECharts：init 后 setOption 画饼图
import * as echarts from 'echarts'
import { shallowRef, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'

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
      trigger : 'item',
      formatter : '{a} <br/>{b} : {c} ({d}%)'
    },
    legend : {
      left : 'center',
      bottom : '10',
      data : ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series : [
      {
        name : 'WEEKLY WRITE ARTICLES',
        type : 'pie',
        roseType : 'radius',
        radius : [15, 95],
        center : ['50%', '38%'],
        data : [
          { value : 320, name : 'Industries' },
          { value : 240, name : 'Technology' },
          { value : 149, name : 'Forex' },
          { value : 100, name : 'Gold' },
          { value : 59, name : 'Forecasts' }
        ],
        animationEasing : 'cubicInOut',
        animationDuration : 2600
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
