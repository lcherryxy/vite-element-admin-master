// Vue 3：createApp 创建应用实例（替代 Vue 2 的 new Vue）
import { createApp } from 'vue'
import App from './App.vue'
// Vue Router 4：前端路由
import router from './router'
// Pinia：全局状态（替代 Vuex）
import { registerStore } from '@/store'
import { useSvgIcon } from './icons'
// Element Plus：Vue3 UI 组件库（按钮、表格、弹窗等）
import ElementPlus from 'element-plus'
import './permission'

import 'animate.css'
import './styles/index.scss'
import './assets/fonts/index.css'

// Element Plus 全局样式
import 'element-plus/dist/index.css'

import './assets/iconfont/iconfont.css'
// mitt：全局事件总线
import globalEmitter from '@/utils/mitt'
import registerDirective from '@/directive'
// Vue I18n：中英文切换
import { setupI18n } from '@/locale'
// Element Plus Icons：把图标注册成全局组件
import { setupElementIcons } from '@/plugins/elementIcons'
// vxe-table：复杂表格（虚拟滚动、编辑、导出）
import { useTable } from '@/plugins/vxeTable'

// https://lottiefiles.com/web-player?lottie_url=https%3A%2F%2Fassets6.lottiefiles.com%2Fpackages%2Flf20_Kr2vAt3caT.json
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
// ECharts GL：3D 图表（geo3D/graphGL/scatter3D 等组件）
// 注意：echarts-gl 内部的 geo3D exists 警告已在 index.html 里拦截
import 'echarts-gl'

const app = createApp(App)

const initApp = async () => {
  app.use(Vue3Lottie)
  app.use(router)
  useSvgIcon(app)
  registerStore(app)
  registerDirective(app)
  await router.isReady()

  setupI18n(app)
  setupElementIcons(app)

  app.use(globalEmitter)
  // Element Plus：全局注册后模板里可直接写 el-button、el-form
  app.use(ElementPlus)
  app.use(useTable)
  app.mount('#app')
  // 挂载完成后隐藏首屏骨架屏
  document.body.classList.add('vue-ready')
}
initApp()
