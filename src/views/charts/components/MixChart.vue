<template>
  <div :id="props.id" :class="props.className" :style="{ height: props.height, width: props.width }" />
</template>

<script setup>
// ECharts 5：柱状 + 折线混合图（男女人数 + 平均值）
import * as echarts from 'echarts'
import { onMounted, shallowRef, onBeforeUnmount } from 'vue'

const props = defineProps({
  className: { type: String, default: 'chart' },
  id: { type: String, default: 'chart' },
  width: { type: String, default: '200px' },
  height: { type: String, default: '200px' }
})

const chart = shallowRef(null)

onMounted(() => { initChart() })

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})

const initChart = () => {
  chart.value = echarts.init(document.getElementById(props.id))

  const xData = (() => {
    const arr = []
    for (let i = 1; i < 13; i++) arr.push(i + 'month')
    return arr
  })()

  // ECharts 5：
  // 1. itemStyle.normal → itemStyle（属性直接写）
  // 2. title.textStyle / legend.textStyle → 去掉嵌套，属性直接写父级
  // 3. calculable: true → ECharts 3 遗留，已废弃。用 dataZoom 代替（本图已有）
  // 4. dataZoom.textStyle → ECharts 5 保留（dataZoom 的 textStyle 还存在）
  chart.value.setOption({
    backgroundColor: '#344b58',
    title: {
      text: 'statistics',
      x: '20',
      top: '20',
      // ECharts 5：title.textStyle 已移除
      color: '#fff',
      fontSize: 22,
      subtext: '',
      subtextStyle: { color: '#90979c', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { textStyle: { color: '#fff' } }
    },
    grid: {
      left: '5%',
      right: '5%',
      borderWidth: 0,
      top: 150,
      bottom: 95
      // ECharts 5：grid.textStyle 已移除（grid 本身无 text）
    },
    legend: {
      x: '5%',
      top: '10%',
      // ECharts 5：legend.textStyle 已移除
      color: '#90979c',
      data: ['female', 'male', 'average']
    },
    // ECharts 3 的 calculable: true 已废弃，dataZoom 组件已实现同样功能
    xAxis: [
      {
        type: 'category',
        axisLine: { lineStyle: { color: '#90979c' } },
        splitLine: { show: false },
        axisTick: { show: false },
        splitArea: { show: false },
        axisLabel: { interval: 0 },
        data: xData
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { show: false },
        axisLine: { lineStyle: { color: '#90979c' } },
        axisTick: { show: false },
        axisLabel: { interval: 0 },
        splitArea: { show: false }
      }
    ],
    dataZoom: [
      {
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 30,
        start: 10,
        end: 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: { color: '#d3dee5' },
        textStyle: { color: '#fff' },
        borderColor: '#90979c'
      },
      { type: 'inside', show: true, height: 15, start: 1, end: 35 }
    ],
    series: [
      // female 堆叠柱状
      {
        name: 'female',
        type: 'bar',
        stack: 'total',
        barMaxWidth: 35,
        barGap: '10%',
        // ECharts 5：itemStyle.normal.xxx → itemStyle.xxx
        itemStyle: {
          color: 'rgba(255,144,128,1)',
          // ECharts 5：barBorderRadius 已废弃，改用 borderRadius
          label: {
            show: true,
            // ECharts 5：label.textStyle 已移除，color 直接写 label 下
            color: '#fff',
            position: 'insideTop',
            formatter(p) { return p.value > 0 ? p.value : '' }
          }
        },
        data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
      },
      // male 堆叠柱状
      {
        name: 'male',
        type: 'bar',
        stack: 'total',
        itemStyle: {
          color: 'rgba(0,191,183,1)',
          borderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter(p) { return p.value > 0 ? p.value : '' }
          }
        },
        data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220]
      },
      // average 折线
      {
        name: 'average',
        type: 'line',
        stack: 'total',
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          color: 'rgba(252,230,48,1)',
          borderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter(p) { return p.value > 0 ? p.value : '' }
          }
        },
        data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
      }
    ]
  })
}
</script>
