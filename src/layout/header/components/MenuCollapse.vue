<template>
  <button
    class="group size-8"
    @click="layoutStore.collapsedChange"
  >
    <component
      :is="layoutStore.collapsed ? Bars3Icon : Bars3CenterLeftIcon"
      class="size-5"
    />
  </button>
</template>

<script setup lang="ts">
import { Bars3CenterLeftIcon, Bars3Icon } from '@heroicons/vue/24/solid'
import { useLayoutStore } from '@/store'

const layoutStore = useLayoutStore()
</script>
