<template>
  <n-button
    :="_attrs"
    @click="handleClickThrottle"
  >
    {{ props.text }}
  </n-button>
</template>

<script setup lang="ts">
import { throttle } from 'lodash-es'

interface Props {
  text: string
  time?: number
  leading?: boolean
  trailing?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  text: '',
  time: 500,
  leading: true,
  trailing: false,
})
const emit = defineEmits(['click'])
const _attrs = useAttrs()
const handleClickThrottle = throttle(() => {
  emit('click')
}, props.time, {
  leading: props.leading,
  trailing: props.trailing,
})

onUnmounted(() => {
  handleClickThrottle.cancel()
})
</script>
