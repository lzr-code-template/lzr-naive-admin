<template>
  <page-card>
    <template #header>
      <div class="h-14 border-b f-c space-x-1 text-sm font-normal cursor-default">
        <p class="text-gray-400">订单管理</p>
        <chevron-right-icon class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-primary">订单列表</p>
      </div>
    </template>
    <template #default>
      <suspense>
        <template #fallback>
          <base-loading />
        </template>
        <template #default>
          <ListAsync />
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import BaseLoading from '@/components/Base/BaseLoading.vue'

defineOptions({
  name: 'OrderOrder'
})

const ListAsync = defineAsyncComponent(() =>
  import('./components/ListAsync.vue')
)
</script>