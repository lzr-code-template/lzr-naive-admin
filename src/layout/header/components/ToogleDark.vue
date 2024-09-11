<template>
  <button
    class="size-8"
    @click="toggleDark"
  >
    <component
      :is="isDark ? MoonIcon : SunIcon"
      class="size-5"
    />
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { useDarkStore } from '@/store'

const isDark = useDark()
const darkStore = useDarkStore()

const toggleDark = async ({ clientX, clientY }: any) => {
  function handler() {
    darkStore.toggleDark()
    useToggle(isDark)()
  }

  if (!document.startViewTransition) {
    return handler()
  }

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY),
    )}px at ${clientX}px ${clientY}px)`,
  ]

  await document.startViewTransition(handler).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}
</script>
