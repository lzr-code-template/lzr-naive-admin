<template>
  <el-scrollbar class="bg-white rounded">
    <suspense>
      <template #fallback>
        <base-loading />
      </template>
      <template #default>
        <EditAsync />
      </template>
    </suspense>
  </el-scrollbar>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'

const EditAsync = defineAsyncComponent(() =>
  import('./components/EditAsync.vue')
)
</script>