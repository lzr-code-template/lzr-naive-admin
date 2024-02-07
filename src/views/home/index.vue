<template>
  <div class="p-4">
    <h1 class="text-3xl">Welcome, {{ user.name }}!</h1>
  </div>
</template>

<script setup lang="ts">
const $cookies = inject<any>('$cookies')
const user = $cookies.get('user')
</script>