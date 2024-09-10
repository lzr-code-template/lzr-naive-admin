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
import type { GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { generate, getRgbStr } from '@arco-design/color'
import { useDarkStore, useThemeStore } from '@/store'

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
/* 设置滚动条滑块的样式 */
/* 1,滚动条 */
::-webkit-scrollbar {
  width: 6px;
  cursor: pointer;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  width: 4px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
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
