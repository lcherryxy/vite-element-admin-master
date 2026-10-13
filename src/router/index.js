import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import Layout from '@/layout/index.vue'
import nested from './modules/nested'
import customComponents from './modules/customComponents'

// 配置路由信息 - 白名单路由，初始化直接注册
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: {
      title: 'Redirect',
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'RedirectPage',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'Redirect',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
      title: '404'
    }
  },
  {
    path: '/401',
    name: 'Error401',
    component: () => import('@/views/error/401.vue'),
    meta: {
      hidden: true,
      title: '401'
    }
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
      title: '500'
    }
  }
]

// 业务路由 - 需要登录权限
export const asyncRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'dashboard',
        name: 'DashboardPage',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '主页',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/icon',
    name: 'Icon',
    component: Layout,
    meta: {
      title: '图标'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index.vue'),
        name: 'Icons',
        meta: { title: '图标', icon: 'image', noCache: true }
      }
    ]
  },

  {
    path: '/directive',
    name: 'Directive',
    component: Layout,
    meta: {
      title: '指令'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/directive/index.vue'),
        name: 'Index',
        meta: { title: '指令', icon: 'directive', noCache: true }
      }
    ]
  },

  // TODO 自定义组件
  customComponents,

  {
    path: '/charts',
    component: Layout,
    name: 'Charts',
    meta: { title: '图表', icon: 'charts' },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard.vue'),
        name: 'KeyboardChart',
        meta: { title: '键盘图表', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line.vue'),
        name: 'LineChart',
        meta: { title: '折线图表', noCache: true }
      },
      {
        path: 'mix-chart',
        component: () => import('@/views/charts/mix-chart.vue'),
        name: 'MixChart',
        meta: { title: '混合图表', noCache: true }
      },
      {
        path: 'line3d',
        component: () => import('@/views/charts/line3D.vue'),
        name: 'Line3d',
        meta: { title: '3D图表', noCache: true }
      }
    ]
  },

  {
    path: '/map',
    name: 'Map',
    component: Layout,
    redirect: '/map/baidu',
    meta: {
      title: '地图',
      icon: 'map'
    },
    children: [
      {
        path: '/baidu',
        name: 'BaiDu',
        component: () => import('@/views/map/baidu.vue'),
        meta: {
          title: '百度地图',
          icon: '',
          noCache: true
        }
      },
      {
        path: '/gaode',
        name: 'GaoDe',
        component: () => import('@/views/map/gaode.vue'),
        meta: {
          title: '高德地图',
          icon: '',
          noCache: true
        }
      },
      {
        path: '/tencent',
        name: 'Tencent',
        component: () => import('@/views/map/tencent.vue'),
        meta: {
          title: '腾讯地图',
          icon: '',
          noCache: true
        }
      }
    ]
  },

  nested,

  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/dynamic',
    meta: { title: '表格', icon: 'table', noCache: true },
    children: [
      {
        path: 'dynamic',
        component: () => import('@/views/table/dynamic-table/index.vue'),
        name: 'DynamicTable',
        meta: { title: '动态表格', noCache: true }
      },
      {
        path: 'drag',
        component: () => import('@/views/table/drag.vue'),
        name: 'DragTable',
        meta: { title: '拖拽表格', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/table/editTable.vue'),
        name: 'EditTable',
        meta: { title: '可编辑表格', noCache: true }
      },
      {
        path: 'complex',
        component: () => import('@/views/table/complexTable.vue'),
        name: 'ComplexTable',
        meta: { title: '综合表格', noCache: true }
      }
    ]
  },

  {
    path: '/user',
    name: 'User',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人中心', icon: 'about', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/page/userCenter/index.vue'),
        name: 'UserCenter',
        meta: { title: '我的账号', noCache: true }
      },
      {
        path: 'history',
        component: () => import('@/views/page/userCenter/loginHistory.vue'),
        name: 'Personal',
        meta: { title: '登录历史', noCache: true }
      },
      {
        path: 'attestation',
        component: () => import('@/views/page/userCenter/attestation.vue'),
        name: 'Attestation',
        meta: { title: '实名认证', noCache: true }
      }
    ]
  },

  {
    path: '/animate',
    name: 'Animate',
    component: Layout,
    redirect: '/animate/index',
    meta: {
      title: '动画'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/animate/index.vue'),
        name: 'AnimatePage',
        meta: { title: '动画', icon: 'animate', noCache: true }
      }
    ]
  },

  {
    path: '/external-link',
    name: 'ExternalLink',
    component: Layout,
    meta: { title: '外链', icon: 'outside' },
    children: [
      {
        path: 'https://github.com/mvpyb/vite-element-admin',
        name: 'Github',
        meta: { title: 'github' }
      },
      {
        path: 'https://staging-cn.vuejs.org/',
        name: 'VUE3',
        meta: { title: 'VUE3' }
      }
    ]
  },

  // 404 catch-all - 必须放在 asyncRoutes 最后！
  // pathMatch(.*)* 匹配多层路径，Vue Router 4 的正确写法
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Redirect404',
    meta: {
      title: '404',
      hidden: true
    }
  }
]

const router = createRouter({
  // Hash 模式：URL 带 #，部署到任何静态服务器都无需特殊配置
  // 刷新时服务器只返回 index.html，由前端路由接管 hash 里的路径
  // 注意：base 参数必须是绝对路径 '/' 或空字符串 ''，不能是 './' 相对路径
  // 否则 Vue Router 4 会报 "No match found for location with path '/'"
  history: createWebHashHistory(),
  // 初始化全量注册，保证 Vue Router 启动时不会报 "No match found"
  // permission.js 里会根据权限过滤后 addRoute 覆盖（同名路由会替换）
  routes: constantRoutes.concat(asyncRoutes),
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
  // constantRoutes 里的路由（登录/错误页），登出时不删除
  const constantRouteNames = ['Login', 'Error404', 'Error401', 'Error500', 'Redirect']
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !constantRouteNames.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
