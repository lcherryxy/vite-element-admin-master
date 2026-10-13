import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerStore } from '@/store'
import { useSvgIcon } from './icons'
import ElementPlus from 'element-plus'
import './permission'

import 'animate.css'
import './styles/index.scss'
import './assets/fonts/index.css'
import 'element-plus/dist/index.css'
import './assets/iconfont/iconfont.css'
import registerDirective from '@/directive'
import { setupI18n } from '@/locale'
import { setupElementIcons } from '@/plugins/elementIcons'
import { useTable } from '@/plugins/vxeTable'

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
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
  app.use(ElementPlus)
  app.use(useTable)
  app.mount('#app')
  document.body.classList.add('vue-ready')
}
initApp()
