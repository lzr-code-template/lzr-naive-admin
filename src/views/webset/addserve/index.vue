<template>
  <page-card>
    <template #header>
      <div class="f-c h-14 cursor-default space-x-1 border-b text-sm font-normal dark:border-b-gray-700">
        <p class="text-gray-400">网站管理</p>
        <ChevronRightIcon class="size-3.5 text-gray-400" />
        <p class="text-primary">增值服务</p>
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
  name: 'WebsetArticle',
})

const ListAsync = defineAsyncComponent(() =>
  import('./components/ListAsync.vue'),
)
</script>
