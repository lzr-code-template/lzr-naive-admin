<template>
  <n-card 
    :header-style="props.headerStyle"
    :content-style="props.contentStyle"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
  </n-card>
</template>

<script setup lang="ts">
interface Props {
  headerStyle: string
  contentStyle: string
}
const props = withDefaults(defineProps<Props>(), {
  headerStyle: 'padding: 0 1.5rem',
  contentStyle: 'padding: 0 1.5rem'
})
</script>