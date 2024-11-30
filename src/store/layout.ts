import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  /* 标题 */
  const title = ref<string>('lzr-naive-admin')
  /* 折叠 */
  const collapsed = ref<boolean>(false)
  // 折叠监听
  const collapsedUpdate = (collapsed: boolean): void => {
    title.value = ''
    if (!collapsed) { setTimeout(() => title.value = 'lzr-naive-admin', 150) }
  }
  // 折叠操作
  const collapsedChange = (): void => {
    if (collapsed.value) {
      collapsed.value = false
      setTimeout(() => title.value = 'lzr-naive-admin', 150)
    }
    else {
      collapsed.value = true
      title.value = ''
    }
  }
  return {
    title,
    collapsed,
    collapsedUpdate,
    collapsedChange,
  }
}, {
  persist: true, // 支持持久化
})
