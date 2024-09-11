<template>
  <n-card
    :header-style="props.headerStyle"
    :content-style="props.contentStyle"
    class="cus-scroll"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
  </n-card>
</template>

<script setup lang="ts">
interface Props {
  headerStyle?: string
  contentStyle?: string
}
const props = withDefaults(defineProps<Props>(), {
  headerStyle: 'padding: 0 1.5rem',
  contentStyle: 'padding: 0 1.5rem',
})
</script>
