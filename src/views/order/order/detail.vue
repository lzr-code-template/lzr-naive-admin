<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          <DetailAsync />
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

const DetailAsync = defineAsyncComponent(() =>
  import('./components/DetailAsync.vue'),
)
</script>
