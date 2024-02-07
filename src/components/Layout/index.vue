<template>
  <div class="h-screen flex flex-col text-t3">
    <!-- 头部（header） -->
    <NavBar />
    <div class="grow bg-gray-200 flex overflow-hidden">
      <!-- 侧边栏（sidebar） -->
      <SideBar />
      <!-- 内容区域（content） -->
      <div class="grow flex flex-col overflow-hidden">
        <CrumbBar />
        <div class="p-4 grow overflow-hidden">
          <AppMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import SideBar from './SideBar.vue'
import CrumbBar from './CrumbBar.vue'
import AppMain from './AppMain.vue'
</script>