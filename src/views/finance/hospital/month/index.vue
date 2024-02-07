<template>
  <div>
    <suspense>
      <template #fallback>
        <base-loading />
      </template>
      <template #default>
        <ListAsync />
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'

const ListAsync = defineAsyncComponent(() =>
  import('./components/ListAsync.vue')
)
</script>