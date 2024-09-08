import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'
import type { GlobalThemeOverrides } from 'naive-ui'
import { defaultPrimaryColor, naiveThemeOverrides } from '@/settings'

export const useLayoutStore = defineStore('layout', () => {
  /* 标题 */
  const title = ref<string>('LT转运后台管理系统')
  /* 主题 */
  const isDark = useDark()
  const toggleDark = () => {
    isDark.value = !isDark.value
  }
  const primaryColor = ref<string>(defaultPrimaryColor)
  const themeOverrides = ref<GlobalThemeOverrides>(naiveThemeOverrides)
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }
  const setThemeColor = (color = primaryColor.value, isd = isDark.value) => {
    const colors = generate(color, {
      list: true,
      dark: isd,
    })
    document.body.style.setProperty('--primary-color', getRgbStr(colors[5]))
    themeOverrides.value.common = Object.assign(themeOverrides.value.common || {}, {
      primaryColor: colors[5],
      primaryColorHover: colors[4],
      primaryColorSuppl: colors[4],
      primaryColorPressed: colors[6],
    })
  }
  /* 折叠 */
  const collapsed = ref<boolean>(false)
  // 折叠监听
  const collapsedUpdate = (collapsed: boolean): void => {
    title.value = ''
    if (!collapsed) { setTimeout(() => title.value = 'LT转运后台管理系统', 150) }
  }
  // 折叠操作
  const collapsedChange = (): void => {
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
    isDark,
    primaryColor,
    themeOverrides,
    collapsed,
    setPrimaryColor,
    setThemeColor,
    toggleDark,
    collapsedUpdate,
    collapsedChange,
  }
}, {
  persist: true, // 支持持久化
})
