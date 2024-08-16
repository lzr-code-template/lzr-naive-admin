import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  // 标题
  const title = ref<string>('LT转运后台管理系统')
  // 是否折叠
  const collapsed = ref<boolean>(false)
  // 折叠监听
  const collapsedUpdate = (collapsed: boolean) => {
    title.value = ''
    if (!collapsed) { setTimeout(() => title.value = 'LT转运后台管理系统', 150) }
  }
  // 折叠操作
  const collapsedChange = () => {
    if (collapsed.value) {
      collapsed.value = false
      setTimeout(() => title.value = 'LT转运后台管理系统', 150)
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
