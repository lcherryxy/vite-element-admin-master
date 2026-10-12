/**
 * Vue Router 导航守卫：登录态、角色、页面标题。
 * NProgress：路由切换时顶部进度条。
 */
import router from './router'
import { getCookie } from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
import getPageTitle from '@/utils/getPageTitle'
import { useUserStore, usePermissionStore } from '@/store'
import NProgress from '@/utils/progress'

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta?.title)
  const hasToken = getCookie(TOKEN)
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (hasToken && hasToken !== 'undefined') {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await userStore.getUserInfo()
          await permissionStore.setRoutes(roles)
          next()
        } catch (error) {
          await userStore.resetInfo()
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
