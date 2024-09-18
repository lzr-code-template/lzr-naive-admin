<template>
  <div class="flex size-full flex-col rounded bg-white px-6 dark:bg-t2/50">
    <div class="h-14 shrink-0 cursor-default border-b dark:border-b-gray-700">
      <BreadCrumb />
    </div>
    <div class="grow">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
