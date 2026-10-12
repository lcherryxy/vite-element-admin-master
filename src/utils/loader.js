/**
 * 动态插入 script / link。loadJS 返回 Promise，方便 await / then。
 */
export function loadCSS(url, cacheBust = false) {
  const element = document.createElement('link')
  element.rel = 'stylesheet'
  element.type = 'text/css'
  element.href = cacheBust ? `${url}?t=${Date.now()}` : url
  document.body.appendChild(element)
}

export function loadJS(src, cacheBust = false) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = cacheBust ? `${src}?t=${Date.now()}` : src
    script.onload = () => resolve(src)
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.body.appendChild(script)
  })
}
