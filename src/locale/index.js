// see more : https://vue-i18n.intlify.dev/introduction.html
import { createI18n } from 'vue-i18n'
// import { createI18n } from 'vue-i18n/index'
import messages from './getMessage'

const localeData = {
  legacy : false, // composition API 模式，项目代码用 useI18n()
  locale : 'zh',
  globalInjection : true,
  messages
}

export const i18n = createI18n(localeData)

export function setupI18n(app) {
  app.use(i18n)
}
