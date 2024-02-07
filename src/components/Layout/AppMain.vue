<template>
  <router-view v-slot="{ Component, route }" class="h-full">
    <transition name="slide-fade" mode="out-in">
      <keep-alive :include="useKeepaliveStore().includeList" :max="10">
        <component :is="Component" :key="$route.name" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useKeepaliveStore } from '@/store/keepalive'
</script>
