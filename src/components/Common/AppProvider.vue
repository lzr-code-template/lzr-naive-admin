<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="darkStore.isDark ? darkTheme : undefined"
    :theme-overrides="themeStore.themeOverrides"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { useDarkStore, useThemeStore } from '@/store'
import { darkTheme, dateZhCN, NConfigProvider, zhCN } from 'naive-ui'

const themeStore = useThemeStore()
const darkStore = useDarkStore()

watchEffect(() => {
  themeStore.setThemeColor(themeStore.primaryColor, darkStore.isDark)
})
</script>

<style>
#nprogress .bar {
  background: rgba(var(--primary-color)) !important;
}

.n-data-table-filter-menu__action {
  @apply flex items-center justify-end !important;
}

html.dark {
  --w-e-textarea-bg-color: #333;
  --w-e-textarea-color: #fff;
  --w-e-toolbar-bg-color: #333;
  --w-e-toolbar-color: #fff;
}
</style>
