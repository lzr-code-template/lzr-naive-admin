<template>
  <n-layout
    has-sider
    :native-scrollbar="false"
  >
    <div class="flex h-screen w-full">
      <LayoutSidebar />
      <n-layout content-style="display:flex; flex-direction: column; height: 100vh">
        <LayoutHeader />
        <n-layout-content
          bordered
          :content-style="`padding: 12px; background-color: ${layoutStore.isDark ? '#1e1e1e' : '#f0f2f5'}`"
        >
          <AppMain />
        </n-layout-content>
      </n-layout>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import AppMain from './AppMain.vue'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()
</script>
