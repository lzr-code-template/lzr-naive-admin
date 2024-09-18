<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          <AddAsync />
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup>
import BaseLoading from '@/components/Base/BaseLoading.vue'

const AddAsync = defineAsyncComponent(() =>
  import('./components/AddAsync.vue'),
)
</script>
