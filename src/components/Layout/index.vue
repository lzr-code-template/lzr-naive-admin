<template>
  <n-layout has-sider>
    <div class="w-full h-screen flex text-t3">
      <layout-sidebar />
      <div class="grow flex flex-col">
        <layout-header />
        <div class="bg-gray-100 p-4 grow overflow-hidden">
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