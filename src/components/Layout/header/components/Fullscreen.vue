<template>
  <button
    class="size-8"
    @click="toggle"
  >
    <component
      :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon"
      class="size-5"
    />
  </button>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/outline'

const { isFullscreen, toggle } = useFullscreen()
</script>
