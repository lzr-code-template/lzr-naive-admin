<template>
  <page-card>
    <template #header>
      <div class="f-c h-14 cursor-default space-x-1 border-b text-sm font-normal">
        <p class="text-gray-400">系统管理</p>
        <ChevronRightIcon class="size-3.5 text-gray-400" />
        <p class="text-primary">账号管理</p>
      </div>
    </template>
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
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import BaseLoading from '@/components/Base/BaseLoading.vue'

defineOptions({
  name: 'ForumAudit',
})

const ListAsync = defineAsyncComponent(() =>
  import('./components/ListAsync.vue'),
)
</script>
