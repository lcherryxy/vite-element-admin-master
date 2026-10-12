/**
 * Pinia：Vue3 官方推荐的状态管理，替代 Vuex。
 * createPinia() 创建仓库，app.use 后各模块用 useXxxStore() 取状态。
 */
import { createPinia } from 'pinia'
import useUserStore from './modules/users'
import useTagsViewStore from './modules/tagsView'
import useAppStore from './modules/app'
import useSettingsStore from './modules/settings'
import usePermissionStore from './modules/permission'

const store = createPinia()

export function registerStore(app) {
  app.use(store)
}

export { useUserStore, useTagsViewStore, useAppStore, useSettingsStore, usePermissionStore }

export default store
