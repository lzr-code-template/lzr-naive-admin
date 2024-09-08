<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="layoutStore.isDark ? darkTheme : undefined"
    :theme-overrides="layoutStore.themeOverrides"
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
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
// import type { GlobalThemeOverrides } from 'naive-ui'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()

watchEffect(() => {
  layoutStore.setThemeColor(layoutStore.primaryColor, layoutStore.isDark)
})
</script>

<style>
#nprogress .bar {
  background: #0064c8 !important;
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
</style>
