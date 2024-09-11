<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div class="f-c-c size-7">
        <n-color-picker
          size="small"
          :value="themeStore.primaryColor"
          :swatches="primaryColors"
          :on-update:value="(v) => themeStore.setPrimaryColor(v)"
          :render-label="() => ''"
        />
      </div>
    </template>
    设置主题色
  </n-tooltip>
</template>

<script setup lang="ts">
import { getPresetColors } from '@arco-design/color'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()
const primaryColors = Object.entries(getPresetColors()).map(([, value]) => value.primary)
</script>
