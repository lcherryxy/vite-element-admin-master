<template>
  <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
// ECharts 5：雷达图（6 维）
import * as echarts from 'echarts'
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const animationDuration = 3000

const props = defineProps( {
  className : { type : String, default : 'chart' },
  width     : { type : String, default : '100%' },
  height    : { type : String, default : '300px' }
} )

const chart     = ref( null )
const container  = ref( null )

const initChart = () => {
  chart.value = echarts.init( container.value )
  chart.value.setOption( {
    tooltip : {
      trigger      : 'axis',
      axisPointer  : { type : 'shadow' }
    },
    radar : {
      radius    : '66%',
      center    : ['50%', '42%'],
      splitNumber : 10,
      splitArea : {
        areaStyle : {
          color         : 'rgba(127,95,132,.3)',
          opacity       : 1,
          shadowBlur    : 45,
          shadowColor   : 'rgba(0,0,0,.5)',
          shadowOffsetX : 0,
          shadowOffsetY : 15
        }
      },
      // ECharts 5：雷达 indicator 的 max 统一，防止 alignTicks 警告
      indicator : [
        { name : 'Sales',                 max : 20000 },
        { name : 'Administration',        max : 20000 },
        { name : 'Information Technology', max : 20000 },
        { name : 'Customer Support',       max : 20000 },
        { name : 'Development',            max : 20000 },
        { name : 'Marketing',              max : 20000 }
      ],
      axisName : { show : true }
    },
    legend : {
      left   : 'center',
      bottom : '10',
      data   : ['Allocated Budget', 'Expected Spending', 'Actual Spending']
    },
    series : [
      {
        type       : 'radar',
        symbolSize : 0,
        areaStyle  : {
          shadowBlur    : 13,
          shadowColor   : 'rgba(0,0,0,.2)',
          shadowOffsetX : 0,
          shadowOffsetY : 10,
          opacity       : 1
        },
        data : [
          { value : [5000, 7000, 12000, 11000, 15000, 14000], name : 'Allocated Budget' },
          { value : [4000, 9000, 15000, 15000, 13000, 11000], name : 'Expected Spending' },
          { value : [5500, 11000, 12000, 15000, 12000, 12000], name : 'Actual Spending' }
        ],
        animationDuration
      }
    ]
  } )
}

onMounted( () => {
  nextTick( () => { initChart() } )
} )
onBeforeUnmount( () => {
  if ( chart.value ) {
    chart.value.dispose()
    chart.value = null
  }
} )

defineOptions( { name : 'RaddarChart' } )
</script>
