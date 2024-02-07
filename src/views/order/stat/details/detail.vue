<template>
  <el-scrollbar class="rounded">
    <suspense>
      <template #fallback>
        <base-loading />
      </template>
      <template #default>
        <DetailAsync />
      </template>
    </suspense>
  </el-scrollbar>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'

const DetailAsync = defineAsyncComponent(() =>
  import('./components/DetailAsync.vue')
)
</script>