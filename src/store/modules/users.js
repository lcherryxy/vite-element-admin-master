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
    name: '内容工坊用户',
    phone: '15988888888',
    email: 'admin@contentstudio.local',
    identity: '',
    gender: '保密',
    birthday: '',
    bio: '',
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
    // 绑定 / 更换手机号
    updatePhone(phone = '') {
      this.phone = phone
    },
    // 绑定 / 更换邮箱
    updateEmail(email = '') {
      this.email = email
    },
    // 完善个人信息：昵称、性别、生日、简介
    updateProfile(payload = {}) {
      Object.assign(this, payload)
    },
    // 实名认证：保存实名信息（{ name, idNumber }），卡片据此显示已认证
    updateIdentity(identity = '') {
      this.identity = identity
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
          this.gender = '保密'
          this.birthday = ''
          this.bio = ''
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
