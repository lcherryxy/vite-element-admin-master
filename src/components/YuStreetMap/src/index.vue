<template>
  <div id="map" class="map" />
</template>

<script setup>
import { onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'
import { Tile as TileLayer } from 'ol/layer'

// doc      : https://openlayers.org/en/latest/doc/quickstart.html
// examples : https://openlayers.org/en/latest/examples/

// 底图使用高德瓦片，避免 openlayers.org 示例数据在国内网络超时报错
function initMap() {
  new Map( {
    target : 'map',
    layers : [
      new TileLayer( {
        source : new XYZ( {
          url : 'https://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          attributions : '&copy; 高德地图'
        } )
      } )
    ],
    view : new View( {
      // 默认投影为 EPSG:3857，经纬度需转换为投影坐标
      center : fromLonLat( [8.2275, 46.8182] ),
      zoom : 5
    } )
  } )
}

onMounted( () => {
  initMap()
} )
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
