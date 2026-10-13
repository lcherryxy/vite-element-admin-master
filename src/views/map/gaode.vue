<template>
  <yu-layout title="高德地图">
    <template #head>
      <el-link
        type="primary"
        href="https://lbs.amap.com/api/jsapi-v2/guide/overlays/vector-overlay"
        target="_blank"
        underline="never"
        >高德开放平台</el-link
      >
    </template>
    <template #body>
      <div class="section-container">
        <el-alert
          v-if="loadFailed"
          :title="failMsg"
          type="error"
          show-icon
          :closable="false"
          class="map-tip"
        >
          <template #default>
            <span>
              高德地图 Key 已失效或未配置，请在
              <code>.env.development</code> / <code>.env.production</code> 中将
              <code>VITE_AMAP_KEY</code> 替换为你自己的有效 Key。
              <a href="https://lbs.amap.com/dev/key/app" target="_blank" rel="noopener">前往申请 →</a>
            </span>
          </template>
        </el-alert>
        <div id="container" ref="container"></div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import YuLayout from '@/components/YuLayout'

const container = ref()
const loadFailed = ref(false)
const failMsg = ref('')
// 高德地图 Key 统一在 .env 中管理
const ak = import.meta.env.VITE_AMAP_KEY
const options = {
  key : ak,
  version : '2.0',
  plugins : ['AMap.MarkerCluster'],
  AMapUI : {
    version : '1.1',
    plugins : []
  },
  Loca : {
    version : '2.0.0'
  }
}
const addMark = async map => {
  const marker = new AMap.Marker( {
    position : new AMap.LngLat( 116.39, 39.9 ),
    title : '北京'
  } )
  map.add( marker )
}

// 添加自定义标记
const customMark = async map => {
  const marker = new AMap.Marker( {
    position : new AMap.LngLat( 116.39, 39.9 ),
    offset : new AMap.Pixel( -10, -10 ),
    icon : '//vdata.amap.com/icons/b18/1/2.png',
    title : '北京'
  } )
  map.add( marker )
}

// AMapLoader：高德地图 SDK 动态加载器（npm install @amap/amap-jsapi-loader）
onMounted( async () => {
  try {
    const AMap = await AMapLoader.load( options )
    const map = new AMap.Map( container.value, {
      zoom : 12,
      center : [116.397428, 39.90923],
      pitch : 0,
      viewMode : '3D'
    } )
    await addMark( map )
    await customMark( map )
  } catch ( e ) {
    // Key 失效（USER_KEY_RECYCLED / INVALID_USER_KEY 等）时给出友好提示，而不是只打 console
    loadFailed.value = true
    failMsg.value = e?.info || e?.message || '地图加载失败'
    console.error( '高德地图加载失败', e )
  }
} )
</script>

<style lang="scss" scoped>
.info {
  height: 30px;
  line-height: 30px;
}
.map-tip {
  margin-bottom: 12px;
}
#container {
  width: 100vw;
  height: calc(100vh - 120px);
}
</style>
