/**
 * 文件工具函数集：base64 / blob / file 互转 + 下载
 */

// Base64 → Blob（Blob API：浏览器端二进制数据容器）
export const base64ToBlob = base64 => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// URL → Base64（通过 Canvas toDataURL）
export function urlToBase64(url, mineType) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = ''
    img.onload = function() {
      if (!canvas || !ctx) return reject(new Error('失败'))
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      resolve(dataURL)
    }
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = url
  })
}

// Blob → File
export function blobToFile(blobs = [], fileName = 'test.zip', fileType = 'application/zip') {
  return new File(blobs, fileName, { type: fileType })
}

// Base64 → File
export function base64ToFile(url, fileName) {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

// 下载（Blob 流）— URL.createObjectURL + a[download] 触发浏览器下载
export function downloadByData(data, filename, mime, bom) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  const blobURL = window.URL.createObjectURL(blob)
  const downloadElement = document.createElement('a')
  downloadElement.style.display = 'none'
  downloadElement.href = blobURL
  downloadElement.setAttribute('download', filename)
  if (typeof downloadElement.download === 'undefined') {
    downloadElement.setAttribute('target', '_blank')
  }
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(blobURL)
}

// 下载（在线 URL）— 先转 base64 再下载
export async function downloadByOnlineUrl(url, filename, mime, bom) {
  const base64 = await urlToBase64(url)
  downloadByBase64(base64, filename, mime, bom)
}

// 下载（Base64）
export function downloadByBase64(buf, filename, mime, bom) {
  const base64Buf = base64ToBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}
