<template>
  <div :id="props.id" :class="props.className" :style="{ height: props.height, width: props.width }" />
</template>

<script setup>
// ECharts 5：折线图 + markPoint / markLine 标注
// ECharts 4→5 迁移：去掉 .normal 层级、去掉 textStyle 嵌套（属性直接写在父级）
import * as echarts from 'echarts'
import { onMounted, shallowRef, onBeforeUnmount } from 'vue'

const props = defineProps( {
  className : { type : String, default : 'chart' },
  id        : { type : String, default : 'chart' },
  width     : { type : String, default : '200px' },
  height    : { type : String, default : '200px' }
} )

const chart = shallowRef( null )

onMounted( () => { initChart() } )

onBeforeUnmount( () => {
  if ( chart.value ) {
    chart.value.dispose()
    chart.value = null
  }
} )

const initChart = () => {
  chart.value = echarts.init( document.getElementById( props.id ) )

  // ECharts 5 写法：itemStyle / lineStyle / areaStyle 不再有 .normal 子层级
  // axisLabel / title / legend 的 textStyle 也被移除，属性直接写在父级
  chart.value.setOption( {
    backgroundColor : '#394056',
    title : {
      top      : 20,
      text     : 'Requests',
      // ECharts 5：textStyle 已移除，fontSize/fontWeight/color 直接写 title 下
      fontWeight : 'normal',
      fontSize   : 16,
      color      : '#F1F1F3',
      left     : '1%'
    },
    tooltip : {
      trigger      : 'axis',
      axisPointer : { lineStyle : { color : '#57617B' } }
    },
    legend : {
      top       : 20,
      icon      : 'rect',
      itemWidth : 14,
      itemHeight : 5,
      itemGap   : 13,
      data      : ['CMCC', 'CTCC', 'CUCC'],
      right     : '4%',
      // ECharts 5：legend.textStyle 已移除
      fontSize : 12,
      color    : '#F1F1F3'
    },
    grid : {
      top         : 100,
      left        : '2%',
      right       : '2%',
      bottom      : '2%',
      containLabel : true
    },
    xAxis : [
      {
        type        : 'category',
        boundaryGap : false,
        axisLine    : { lineStyle : { color : '#57617B' } },
        data        : ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      }
    ],
    yAxis : [
      {
        type     : 'value',
        name     : '(%)',
        axisTick : { show : false },
        axisLine : { lineStyle : { color : '#57617B' } },
        axisLabel : {
          margin : 10,
          // ECharts 5：axisLabel.textStyle 已移除，fontSize 直接写 axisLabel 下
          fontSize : 14
        },
        splitLine : { lineStyle : { color : '#57617B' } }
      }
    ],
    series : [
      // CMCC
      {
        name      : 'CMCC',
        type      : 'line',
        smooth    : true,
        symbol    : 'circle',
        symbolSize : 5,
        showSymbol : false,
        // ECharts 5：lineStyle.normal.width → lineStyle.width
        lineStyle : { width : 1 },
        // ECharts 5：areaStyle.normal.color → areaStyle.color
        areaStyle : {
          color : new echarts.graphic.LinearGradient( 0, 0, 0, 1,
            [
              { offset : 0,   color : 'rgba(137, 189, 27, 0.3)' },
              { offset : 0.8, color : 'rgba(137, 189, 27, 0)' }
            ], false ),
          shadowColor : 'rgba(0, 0, 0, 0.1)',
          shadowBlur  : 10
        },
        // ECharts 5：itemStyle.normal.color → itemStyle.color
        itemStyle : {
          color      : 'rgb(137,189,27)',
          borderColor : 'rgba(137,189,2,0.27)',
          borderWidth : 12
        },
        data : [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
      },
      // CTCC
      {
        name       : 'CTCC',
        type       : 'line',
        smooth     : true,
        symbol     : 'circle',
        symbolSize : 5,
        showSymbol : false,
        lineStyle  : { width : 1 },
        areaStyle  : {
          color : new echarts.graphic.LinearGradient( 0, 0, 0, 1,
            [
              { offset : 0,   color : 'rgba(0, 136, 212, 0.3)' },
              { offset : 0.8, color : 'rgba(0, 136, 212, 0)' }
            ], false ),
          shadowColor : 'rgba(0, 0, 0, 0.1)',
          shadowBlur  : 10
        },
        itemStyle : {
          color       : 'rgb(0,136,212)',
          borderColor : 'rgba(0,136,212,0.2)',
          borderWidth : 12
        },
        data : [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      },
      // CUCC
      {
        name       : 'CUCC',
        type       : 'line',
        smooth     : true,
        symbol     : 'circle',
        symbolSize : 5,
        showSymbol : false,
        lineStyle  : { width : 1 },
        areaStyle  : {
          color : new echarts.graphic.LinearGradient( 0, 0, 0, 1,
            [
              { offset : 0,   color : 'rgba(219, 50, 51, 0.3)' },
              { offset : 0.8, color : 'rgba(219, 50, 51, 0)' }
            ], false ),
          shadowColor : 'rgba(0, 0, 0, 0.1)',
          shadowBlur  : 10
        },
        itemStyle : {
          color       : 'rgb(219,50,51)',
          borderColor : 'rgba(219,50,51,0.2)',
          borderWidth : 12
        },
        data : [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      }
    ]
  } )
}

defineOptions( { name : 'LineMarker' } )
</script>

<style scoped lang="scss"></style>
