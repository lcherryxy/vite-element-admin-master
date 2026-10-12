/**
 * Pinia：用户状态管理。
 * — defineStore 是官方推荐写法（对象形式），也可用 setup 形式，二选一即可。
 * — action 用小驼峰命名（loginOut / getUserInfo），不再沿用 Vuex 的 SET_TOKEN 全大写 mutation 风格。
 * — getter 自动生成（直接 state 上的 computed 属性）。
 */
import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie, clearAllCookies } from '@/utils/cookies'
import { TOKEN, AVATAR } from '@/config/constant'
import { logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import useTagsViewStore from './tagsView'

const useUserStore = defineStore('users', {
  state: () => ({
    token: getCookie(TOKEN),
    uid: '9527',
    avatar: AVATAR,
    name: '灰是小灰灰的灰',
    phone: '15988888888',
    email: '454539387@qq.com',
    identity: '',
    roles: []
  }),
  actions: {
    setToken(token = '') {
      token ? setCookie(TOKEN, token) : removeCookie(TOKEN)
      this.token = token
    },
    // axios：GET 请求，返回用户信息
    async getUserInfo() {
      const { code, data } = await getInfo()
      if (code == 200) {
        const { id, name, avatar, roles, phone, email, identity } = data
        this.uid = id || '9527'
        this.name = name || ''
        this.phone = phone || ''
        this.email = email || ''
        this.identity = identity || ''
        this.avatar = avatar || AVATAR
        this.roles = roles || ['editor']
        return {
          ...data,
          uid: this.uid,
          roles: this.roles
        }
      }
      throw new Error(`getInfo failed with code: ${code}`)
    },
    // axios：POST 请求，调用后端登出接口
    async loginOut() {
      try {
        const { code } = await logout()
        if (code == 200) {
          this.token = ''
          this.name = ''
          this.avatar = ''
          this.phone = ''
          this.email = ''
          this.identity = ''
          this.roles = []
          this.resetInfo()
        }
      } catch (error) {
        // throw error 让上层 catch 能正确处理，不要 return error 吞掉异常
        throw error
      }
    },
    // 登出后清理本地状态：清 Cookie + 清路由 + 清标签页
    resetInfo() {
      // 这里不需要 new Promise — 内部都是同步操作，直接执行即可
      clearAllCookies()
      resetRouter()
      const tagsViewStore = useTagsViewStore()
      tagsViewStore.delAllViews(null)
      return Promise.resolve()
    }
  }
})

export default useUserStore
