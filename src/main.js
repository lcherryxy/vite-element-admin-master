import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerStore } from '@/store'
import { useSvgIcon } from './icons'
import ElementPlus from 'element-plus'
import './permission'

import './styles/index.scss'
import './assets/fonts/index.css'
import 'element-plus/dist/index.css'
// Element Plus 暗色变量：必须放在基础样式之后，html.dark 下自动生效
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/iconfont/iconfont.css'
import registerDirective from '@/directive'
import { setupI18n } from '@/locale'
import { setupElementIcons } from '@/plugins/elementIcons'
import { useTable } from '@/plugins/vxeTable'
import { initTheme } from '@/utils/theme'

// 首次挂载前先应用主题，避免刷新时闪白
initTheme()

const app = createApp(App)

const initApp = async () => {
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
