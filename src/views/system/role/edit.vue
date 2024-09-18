<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          <EditAsync />
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup>
import BaseLoading from '@/components/Base/BaseLoading.vue'

const EditAsync = defineAsyncComponent(() =>
  import('./components/EditAsync.vue'),
)
</script>
