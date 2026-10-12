import { defineStore } from 'pinia'

const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [],
    cachedViews: [],
    currentClose: ''
  }),
  actions: {
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    delView(view) {
      this.delVisitedView(view)
      this.delCachedView(view)
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      }
    },
    delOthersViews(view) {
      this.delOthersVisitedViews(view)
      this.delOthersCachedViews(view)
      return [...this.visitedViews]
    },
    delAllViews() {
      this.delAllVisitedViews()
      this.delAllCachedViews()
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      }
    },
    addVisitedView(view) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    delVisitedView(view) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delCachedView(view) {
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) this.cachedViews.splice(index, 1)
    },
    delOthersVisitedViews(view) {
      this.visitedViews = this.visitedViews.filter((v) => v.meta.affix || v.path === view.path)
    },
    delOthersCachedViews(view) {
      const index = this.cachedViews.indexOf(view.name)
      this.cachedViews = index > -1 ? this.cachedViews.slice(index, index + 1) : []
    },
    delAllVisitedViews() {
      this.visitedViews = this.visitedViews.filter((tag) => tag.meta.affix)
    },
    delAllCachedViews() {
      this.cachedViews = []
    },
    updateVisitedView(view) {
      for (const v of this.visitedViews) {
        if (v.path === view.path) {
          Object.assign(v, view)
          break
        }
      }
    },
    setCurrentClose(name) {
      this.currentClose = name || ''
    }
  }
})

export default useTagsViewStore
