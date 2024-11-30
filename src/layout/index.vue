<template>
  <n-layout
    has-sider
    :native-scrollbar="false"
  >
    <div class="flex h-screen w-full">
      <LayoutSidebar />
      <n-layout content-style="display:flex; flex-direction: column; height: 100vh">
        <LayoutHeader />
        <LayoutContent />
      </n-layout>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import LayoutContent from './content/LayoutContent.vue'
import LayoutHeader from './header/LayoutHeader.vue'
import LayoutSidebar from './sidebar/LayoutSidebar.vue'
</script>
