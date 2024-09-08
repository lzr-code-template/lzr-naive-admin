<template>
  <page-card>
    <template #header>
      <div class="f-c h-14 cursor-default space-x-1 border-b text-sm font-normal dark:border-b-gray-700">
        <p class="text-gray-400">系统管理</p>
        <ChevronRightIcon class="size-3.5 text-gray-400" />
        <button
          class="text-gray-400 hover:text-primary/80 active:text-primary"
          @click="$router.replace('/system/role')"
        >
          角色管理
        </button>
        <ChevronRightIcon class="size-3.5 text-gray-400" />
        <p class="text-primary">编辑角色</p>
      </div>
    </template>
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
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import BaseLoading from '@/components/Base/BaseLoading.vue'

const EditAsync = defineAsyncComponent(() =>
  import('./components/EditAsync.vue'),
)
</script>
