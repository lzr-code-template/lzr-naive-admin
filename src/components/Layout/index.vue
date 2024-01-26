<template>
  <div class="h-screen flex flex-col text-t3">
    <!-- 头部（header） -->
    <NavBar />
    <div class="grow bg-gray-200 flex overflow-hidden">
      <!-- 侧边栏（sidebar） -->
      <SideBar />
      <!-- 内容区域（content） -->
      <div class="grow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import SideBar from './SideBar.vue'
</script>