<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          <ListAsync />
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'

defineOptions({
  name: 'OrderOrder',
})

const ListAsync = defineAsyncComponent(() =>
  import('./components/ListAsync.vue'),
)
</script>
