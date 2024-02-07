<template>
  <el-scrollbar class="bg-white rounded">
    <suspense>
      <template #fallback>
        <base-loading />
      </template>
      <template #default>
        <AddAsync />
      </template>
    </suspense>
  </el-scrollbar>
</template>

<script setup lang="ts">
import BaseLoading from '@/components/Base/BaseLoading.vue'

const AddAsync = defineAsyncComponent(() =>
  import('./components/AddAsync.vue')
)
</script>