<template>
  <n-layout has-sider>
    <div class="flex h-screen w-full text-t3">
      <LayoutSidebar />
      <div class="flex grow flex-col">
        <LayoutHeader />
        <div class="grow overflow-hidden bg-gray-100 p-4">
          <AppMain />
        </div>
      </div>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import AppMain from './AppMain.vue'
</script>
