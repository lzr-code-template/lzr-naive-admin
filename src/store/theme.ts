import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'
import type { GlobalThemeOverrides } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  const primaryColor = ref<string>('#4D80F0')
  const themeOverrides = ref<GlobalThemeOverrides | any>({
    common: {
      primaryColor: '#4D80F0',
      primaryColorHover: '#6B9AF3',
      primaryColorPressed: '#305BC7',
      primaryColorSuppl: '#6B9AF3',
    },
    Tree: {
      fontSize: '14px',
      nodeTextColor: '#606266',
    },
    Alert: {
      borderRadius: '8px',
    },
  })
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }
  const setThemeColor = (color = primaryColor.value, isDark: boolean = useDark() as unknown as boolean) => {
    const colors = generate(color, {
      list: true,
      dark: isDark,
    })
    document.body.style.setProperty('--primary-color', getRgbStr(colors[5]))
    themeOverrides.value.common = Object.assign(themeOverrides.value.common || {}, {
      primaryColor: colors[5],
      primaryColorHover: colors[4],
      primaryColorSuppl: colors[4],
      primaryColorPressed: colors[6],
    })
  }
  return {
    primaryColor,
    themeOverrides,
    setPrimaryColor,
    setThemeColor,
  }
}, {
  persist: true, // 支持持久化
})
