import * as NaiveUI from 'naive-ui'
import { useDarkStore, useThemeStore } from '@/store'

export function setupNaiveDiscreteApi() {
  const themeStore = useThemeStore()
  const darkStore = useDarkStore()
  const configProviderProps = computed(() => ({
    theme: darkStore.isDark ? NaiveUI.darkTheme : undefined,
    themeOverrides: themeStore.themeOverrides,
  }))
  const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps },
  )

  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$message = message
  window.$dialog = dialog
}
