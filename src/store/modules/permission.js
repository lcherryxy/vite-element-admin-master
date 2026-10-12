import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  }
  return true
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: [],
    directivePermission: []
  }),
  actions: {
    setRoutes(roles) {
      const accessedRoutes = roles.includes('admin') ? asyncRoutes || [] : filterAsyncRoutes(asyncRoutes, roles)
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    },
    setDirectiveRole(roles) {
      this.directivePermission = roles
    }
  }
})

export default usePermissionStore
