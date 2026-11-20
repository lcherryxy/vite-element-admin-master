<template>
  <div :class="set.classObject" class="app-wrapper">
    <div class="layout-section" :class="set.layoutMod + '-layout'">
      <div
        v-if="set.device === 'mobile' && set.sidebar.opened && set.layoutMod === 'vertical'"
        class="drawer-bg"
        @click="handleClickOutside(false)"
      />
      <SideBar class="sidebar-container vertical" v-if="set.layoutMod === 'vertical'" />

      <div class="main-container" :class="{ hasTagsView: set.needTagsView }">
        <div :class="{ 'fixed-header': set.fixedHeader }">
          <NavBar :class="set.layoutMod === 'vertical' ? '' : 'sidebar-container horizontal'" />
          <TagsView v-if="set.needTagsView" />
        </div>
        <AppMain :need-tags-view="set.needTagsView" />
        <Settings />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, unref, reactive, computed, watch, onMounted, onBeforeMount } from 'vue'

import { NavBar, AppMain, SideBar, TagsView, Settings } from './components'
import { toggleClass } from '@/utils/el'
// VueUse：监听 window.resize，比自己 addEventListener 更省心
import { useEventListener } from '@vueuse/core'

// Vue Router：当前路由，用于移动端切页时收起侧边栏
import { useRoute } from 'vue-router'
import { useAppStore, useSettingsStore } from '@/store'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const hiddenMainContainer = 'hidden-main-container'

const set = reactive( {
  sidebar : computed( () => {
    return appStore.sidebar
  } ),
  device : computed( () => {
    return appStore.device
  } ),
  showSettings : computed( () => {
    return settingsStore.showSettings
  } ),
  needTagsView : computed( () => {
    return settingsStore.tagsView
  } ),
  fixedHeader : computed( () => {
    return settingsStore.fixedHeader
  } ),
  classObject : computed( () => {
    const obj = {
      hideSidebar : !set.sidebar.opened,
      openSidebar : !!set.sidebar.opened,
      withoutAnimation : set.sidebar.withoutAnimation,
      mobile : set.device === 'mobile',
      tablet : set.device === 'tablet'
    }
    return obj
  } ),
  layoutMod : computed( () => {
    return settingsStore.layoutMod
  } )
} )

const handleClickOutside = params => {
  appStore.closeSidebar( params )
}

const route = useRoute()
// main-container 上控制滚动容器隐藏的类开关
const containerHiddenSideBar = ref( false )
// 断点：手机 < 768，平板 768 ~ 991，PC >= 992
const MOBILE_WIDTH = 768
const TABLET_WIDTH = 992

const getDevice = () => {
  const width = document.body.getBoundingClientRect().width - 1
  if ( width < MOBILE_WIDTH ) return 'mobile'
  if ( width < TABLET_WIDTH ) return 'tablet'
  return 'desktop'
}

// 设备档位切换：手机走抽屉并收起，平板收起为图标栏，PC 默认展开
const applyDevice = () => {
  const device = getDevice()
  if ( device === appStore.device ) return
  appStore.setDevice( device )
  appStore.setSidebarOpened( device === 'desktop' )
}

watch(
  route,
  async() => {
    // 手机和平板切页后收起侧边栏，避免遮挡内容
    if ( set.device !== 'desktop' && set.sidebar.opened ) {
      appStore.setSidebarOpened( false, false )
    }
  },
  { immediate : true }
)

const $_resizeHandler = () => {
  if ( !document.hidden ) {
    applyDevice()
  }
}

onMounted( () => {
  applyDevice()
  toggleClass( unref( containerHiddenSideBar ), hiddenMainContainer, document.querySelector( '.main-container' ) )
} )

onBeforeMount( () => {
  useEventListener( 'resize', $_resizeHandler )
} )
</script>

<style lang="scss" scoped>
@use '../styles/mixin.scss' as *;
@use '../styles/variables.module.scss' as *;

.app-wrapper {
  @include clearFix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9 !important;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  &.main-container {
    width: 100%;
  }
}

.hideSidebar {
  .fixed-header {
    width: calc(100% - 54px);
  }
  .horizontal-layout .fixed-header {
    width: 100%;
  }
}
.horizontal-layout .fixed-header,
.mobile .fixed-header {
  width: 100%;
}

.layout-section {
  &.vertical-layout {
  }
  &.horizontal-layout {
    width: 100%;
    position: relative;
  }
}
</style>
