<template>
  <div class="p-4">
    <h1 class="text-3xl">Welcome, {{ useUserStore().user.name }}!</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
</script>
