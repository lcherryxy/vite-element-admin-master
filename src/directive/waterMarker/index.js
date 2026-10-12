/**
 * Vue 3 自定义指令：水印。
 * 用法：v-waterMarker="{ text: '内部文档', font: '16px Microsoft YaHei', textColor: 'rgba(180,180,180,0.3)' }"
 */
function addWaterMarker(text, parentNode, font, textColor) {
  // Canvas API：绘制半透明水印背景
  const canvas = document.createElement('canvas')
  parentNode.appendChild(canvas)
  canvas.width = 200
  canvas.height = 150
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  ctx.rotate((-20 * Math.PI) / 180)
  ctx.font = font || '16px Microsoft JhengHei'
  ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'Middle'
  ctx.fillText(text, canvas.width / 10, canvas.height / 2)
  parentNode.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
}

const waterMarker = {
  beforeMount(el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
  }
}

export default waterMarker
