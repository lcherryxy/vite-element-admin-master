<template>
  <div :id="props.id" :class="props.className" :style="{ height: props.height, width: props.width }" ref="el" />
</template>

<script setup>
// ECharts 5：柱状 + 折线混合热力图
// @vueuse/core：useResizeObserver + useDebounceFn 实现侧边栏折叠后自动 resize
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount, shallowRef } from 'vue'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'

const el = ref(null)

const props = defineProps({
  className: { type: String, default: 'chart' },
  id: { type: String, default: 'chart' },
  width: { type: String, default: '200px' },
  height: { type: String, default: '200px' }
})

const chart = shallowRef(null)
const $_sidebarElm = ref(null)

const initChart = () => {
  chart.value = echarts.init(document.getElementById(props.id))

  const xAxisData = []
  const data = []
  const data2 = []
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i)
    data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
  }

  chart.value.setOption({
    backgroundColor: '#08263a',
    grid: { left: '5%', right: '5%' },
    xAxis: [
      { show: false, data: xAxisData },
      { show: false, data: xAxisData }
    ],
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: { color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'] }
    },
    yAxis: {
      axisLine: { show: false },
      // ECharts 5：axisLabel.textStyle.color → axisLabel.color
      axisLabel: { color: '#4a657a' },
      splitLine: { show: true, lineStyle: { color: '#08263f' } },
      axisTick: { show: false }
    },
    series: [
      // 底层柱状（back）
      {
        name: 'back',
        type: 'bar',
        data: data2,
        z: 1,
        // ECharts 5：itemStyle.normal.xxx → itemStyle.xxx
        itemStyle: {
          opacity: 0.4,
          // ECharts 5：barBorderRadius 已废弃，改用 borderRadius
          borderRadius: 5,
          shadowBlur: 3,
          shadowColor: '#111'
        }
      },
      // 透明折线（阴影模拟）
      {
        name: 'Simulate Shadow',
        type: 'line',
        data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: 'linear',
        animationDuration: 1200,
        lineStyle: { color: 'transparent' },
        areaStyle: {
          color: '#08263a',
          shadowBlur: 50,
          shadowColor: '#000'
        }
      },
      // 顶层柱状（front）
      {
        name: 'front',
        type: 'bar',
        data,
        xAxisIndex: 1,
        z: 3,
        itemStyle: { borderRadius: 5 }
      }
    ],
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'elasticOut',
    animationDelay(idx) { return idx * 20 },
    animationDelayUpdate(idx) { return idx * 20 }
  })
}

const $_resizeHandler = () => chart.value && chart.value.resize()
const $_sidebarResizeHandler = e => {
  if (e.propertyName === 'width') $_resizeHandler()
}

onMounted(() => {
  initChart()

  $_sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
  $_sidebarElm.value?.addEventListener('transitionend', $_sidebarResizeHandler)

  // @vueuse/core：响应式 resize，防抖 100ms
  useResizeObserver(document.body, useDebounceFn(() => $_resizeHandler(), 100))
})

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})

defineOptions({ name: 'Keyboard' })
</script>
