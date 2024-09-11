<template>
  <n-layout-content
    bordered
    :content-style="`padding: 12px; background-color: ${darkStore.isDark ? '#1e1e1e' : '#f0f2f5'}`"
  >
    <router-view v-slot="{ Component }" class="h-full">
      <transition name="fade-slide" mode="out-in">
        <keep-alive :include="keepaliveStore.includeList" :max="10">
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </n-layout-content>
</template>

<script setup lang="ts">
import { useDarkStore, useKeepaliveStore } from '@/store'

const keepaliveStore = useKeepaliveStore()
const darkStore = useDarkStore()
</script>
