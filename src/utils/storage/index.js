/**
 * Web Storage：直接封装 localStorage / sessionStorage。
 * JSON 序列化放在工具函数里，不再用 class + 继承。
 */
function setStorage(storage, key, value) {
  if (!key) return
  storage.setItem(key, JSON.stringify(value))
}

function getStorage(storage, key) {
  if (!key) return null
  const raw = storage.getItem(key)
  if (raw === '' || raw == null) return ''
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

function removeStorage(storage, key, isAll = false) {
  if (isAll) {
    storage.clear()
    return
  }
  if (key) storage.removeItem(key)
}

export const localStorageHandle = {
  setItem: (key, value) => setStorage(localStorage, key, value),
  getItem: (key) => getStorage(localStorage, key),
  removeItem: (key, isAll) => removeStorage(localStorage, key, isAll),
  clear: () => localStorage.clear()
}

export const sessionStorageHandle = {
  setItem: (key, value) => setStorage(sessionStorage, key, value),
  getItem: (key) => getStorage(sessionStorage, key),
  removeItem: (key, isAll) => removeStorage(sessionStorage, key, isAll),
  clear: () => sessionStorage.clear()
}
