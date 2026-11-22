<template>
  <div ref="wrapperEl" class="tui-editor-wrapper" :style="wrapperStyle">
    <div id="tui-image-editor" ref="editorEl" :style="editorStyle" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import ImageEditor from 'tui-image-editor'
import locale_zh from './langZh'
import customTheme from './theme'
import { base64ToFile } from '@/utils/files'

const props = defineProps( {
  url : {
    type : String,
    default : ''
  },
  fileName : {
    type : String,
    default : 'SampleImage'
  },
  fileSuffix : {
    type : String,
    default : 'png'
  },
  menu : {
    type : Array,
    required : false,
    default() {
      return [
        'crop', // 裁切
        'flip', // 翻转
        'rotate', // 旋转
        'draw', // 添加绘画
        'shape', // 添加形状
        'icon', // 添加图标
        'text', // 添加文本
        'mask', // 添加覆盖
        'filter' // 添加滤镜
      ]
    }
  },
  uiSize : {
    type : Object,
    required : false,
    default() {
      return {
        width : '1000px',
        height : '700px'
      }
    }
  },
  menuBarPosition : {
    type : String,
    default : 'bottom'
  },
  cssMaxWidth : {
    type : Number,
    default : 700
  },
  cssMaxHeight : {
    type : Number,
    default : 900
  }
} )

const editorEl = ref()
const wrapperEl = ref()
const instance = ref( null )
// 容器不足 1000px 时按比例整体缩放，保证工具栏与按钮不重叠
const scale = ref( 1 )
const uiHeight = ref( 700 )

const wrapperStyle = computed( () => {
  if ( scale.value >= 1 ) return {}
  return {
    height : `${uiHeight.value * scale.value}px`,
    overflow : 'hidden'
  }
} )

const editorStyle = computed( () => {
  if ( scale.value >= 1 ) return { margin : '0 auto' }
  return {
    transform : `scale(${scale.value})`,
    transformOrigin : 'top left'
  }
} )

onMounted( () => {
  const el = editorEl.value
  // TUI 编辑器宽度低于 1000px 时顶部工具条会与右侧按钮重叠，因此按 1000px 渲染后整体缩放贴合容器
  const containerWidth = wrapperEl.value?.clientWidth || 1000
  const uiWidth = Math.min( Math.max( containerWidth, 1000 ), 1200 )
  // 手机等极窄屏幕不做缩放，保持 1000px 由内部横向滚动查看
  scale.value = containerWidth >= 640 ? Math.min( 1, containerWidth / uiWidth ) : 1
  uiHeight.value = parseFloat( props.uiSize.height ) || 700
  const options = {
    usageStatistics : false,
    includeUI : {
      loadImage : {
        path : props.url,
        name : props.fileName
      },
      // 操作菜单栏
      menu : props.menu,
      uiSize : { ...props.uiSize, width : `${uiWidth}px` },
      menuBarPosition : props.menuBarPosition, // 操作栏位置
      locale : locale_zh, // 语言
      theme : customTheme, // 主题样式
      initMenu : 'filter'
    },
    cssMaxWidth : props.cssMaxWidth,
    cssMaxHeight : props.cssMaxHeight,
    selectionStyle : {
      cornerSize : 20,
      rotatingPointOffset : 70
    }
  }
  instance.value = new ImageEditor( el, options )
} )

const getFile = ( isBase64 = true ) => {
  if ( !instance.value ) {
    return ''
  }
  const base64 = instance.value.toDataURL()
  const name = `${props.fileName}.${props.fileSuffix}`
  return isBase64 ? base64 : base64ToFile( base64, name )
}

const uploadImg = async() => {
  // const fileName = instance.value.getImageName()
  // const base64 = getFile()
  // // base64文件 | blob 文件上传 TODO
  // try{
  //   const { code, date } = uploadBase64( {
  //     file : base64,
  //     ... // 其他参数 比如 桶名等
  //   } )
  // }catch (e) {
  //
  // }
}

defineExpose( { uploadImg, getFile } )

defineOptions( {
  name : 'ImageEditor'
} )
</script>

<style lang="scss" scoped>
.tui-editor-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* 帮助工具栏固定 506px 居中，编辑区较窄时会与右上角“替换图片/预览图片”按钮重叠，整体左移避开 */
.tui-editor-wrapper :deep(.tui-image-editor-help-menu.top) {
  left: calc(50% - 40px);
}

.tui-image-editor-submenu-item > li > .tui-image-editor-button > div > .tie-mask-image-file {
  display: block !important;
}
</style>
