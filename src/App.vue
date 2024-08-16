<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup lang="ts">
import AppProvider from '@/components/Common/AppProvider.vue'
</script>
