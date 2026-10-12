/**
 * 地图 SDK 动态加载：通过 <script> 标签注入第三方地图 JS。
 * 为什么不 npm install？地图 SDK（百度/腾讯/高德）体积巨大且常更新，按需加载更省首屏。
 */

// Promise 包装动态 <script> 注入
export const dynamicLoad = (src, callback) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onerror = reject
    script.src = src
    document.body.appendChild(script)
    script.onload = () => callback && callback(resolve)
  })
}

// 百度地图 JS API v3.0
export const baiduMap = async (ak) => {
  const src = `http://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=baiduMap`
  return await dynamicLoad(src, resolve => {
    window.baiduMap = () => resolve()
  })
}

// 腾讯地图 JS API v2
export const tencentMap = async (key) => {
  const src = `https://map.qq.com/api/gljs?v=2.exp&key=${key}`
  return await dynamicLoad(src, resolve => resolve())
}
