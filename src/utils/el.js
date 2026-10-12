/**
 * DOM class 操作改用 classList，不再拼 className 字符串。
 */
export const hasClass = (el, cls) => el.classList.contains(cls)

export const addClass = (el, cls, extraCls) => {
  el.classList.add(cls)
  if (extraCls) el.classList.add(extraCls)
}

export const removeClass = (el, cls, extraCls) => {
  el.classList.remove(cls)
  if (extraCls) el.classList.remove(extraCls)
}

export const toggleClass = (flag, clsName, target) => {
  const targetEl = target || document.body
  targetEl.classList.toggle(clsName, !!flag)
}
