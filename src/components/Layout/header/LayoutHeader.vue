<template>
  <n-layout-header
    class="f-c-b z-20 h-14 px-6"
    bordered
  >
    <!-- 折叠菜单栏 -->
    <MenuCollapse />
    <div class="f-c space-x-4">
      <!-- 暗黑模式 -->
      <ToogleDark />
      <!-- 全屏切换 -->
      <Fullscreen />
      <!-- 设置主题色 -->
      <ToggleTheme />
      <!-- | -->
      <n-divider vertical />
      <!-- 头像 -->
      <UserAvatar />
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { Fullscreen, MenuCollapse, ToggleTheme, ToogleDark, UserAvatar } from './components'
</script>
