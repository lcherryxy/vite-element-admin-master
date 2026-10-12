/**
 * 自定义指令 v-clipboard：复制文本。
 * 用浏览器 Clipboard API，不再依赖 clipboard.js。
 */
export default {
  beforeMount(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
      return
    }
    if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
      return
    }
    el._v_clipboard_text = binding.value
    el._v_clipboard_handler = async () => {
      try {
        await navigator.clipboard.writeText(String(el._v_clipboard_text ?? ''))
        el._v_clipboard_success?.()
      } catch (error) {
        el._v_clipboard_error?.(error)
      }
    }
    el.addEventListener('click', el._v_clipboard_handler)
  },
  beforeUpdate(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
      return
    }
    if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
      return
    }
    el._v_clipboard_text = binding.value
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
      return
    }
    if (binding.arg === 'error') {
      delete el._v_clipboard_error
      return
    }
    el.removeEventListener('click', el._v_clipboard_handler)
    delete el._v_clipboard_handler
    delete el._v_clipboard_text
  }
}
