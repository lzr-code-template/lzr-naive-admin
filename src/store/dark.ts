import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useDarkStore = defineStore('dark', () => {
  const isDark = useDark()
  const toggleDark = () => {
    isDark.value = !isDark.value
  }
  return {
    isDark,
    toggleDark,
  }
}, {
  persist: true, // 支持持久化
})
