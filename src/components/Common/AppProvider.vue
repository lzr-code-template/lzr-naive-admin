<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <div class="text-gray-900">
            <slot></slot>
          </div>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, dateZhCN, zhCN } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0064C8',
    primaryColorHover: '#3793DE',
    primaryColorPressed: '#004DAC',
    primaryColorSuppl: '#3793DE',

    infoColor: '#2080F0',
    infoColorHover: '#4098FC',
    infoColorPressed: '#1060C9',
    infoColorSuppl: '#4098FC',

    successColor: '#47B3AA',
    successColorHover: '#4DBFB6',
    successColorPressed: '#3D9991',
    successColorSuppl: '#4DBFB6',

    warningColor: '#F0A020',
    warningColorHover: '#FCB040',
    warningColorPressed: '#C97C10',
    warningColorSuppl: '#FCB040',

    errorColor: '#ef4444',
    errorColorHover: '#f87171',
    errorColorPressed: '#dc2626',
    errorColorSuppl: '#f87171',

  },
  Tree: {
    fontSize: '14px',
    nodeTextColor: '#606266',
  },
  Alert: {
    borderRadius: '8px',
  },
  Tabs: {
    tabTextColorActiveLine: '#47B3AA',
    tabTextColorHoverLine: '#47B3AA',
    tabTextColorActiveBar: '#47B3AA',
    tabTextColorHoverBar: '#47B3AA',
    tabTextColorActiveCard: '#47B3AA',
    barColor: '#47B3AA',
  },
}
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
</style>
