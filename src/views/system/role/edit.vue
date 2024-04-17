<template>
  <page-card>
    <template #header>
      <div class="h-14 border-b f-c space-x-1 text-sm font-normal cursor-default">
        <p class="text-gray-400">系统管理</p>
        <chevron-right-icon class="w-3.5 h-3.5 text-gray-400" />
        <button 
          class="text-gray-400 hover:text-primary/80 active:text-primary"
          @click="$router.replace('/system/role')"
        >
          角色管理
        </button>
        <chevron-right-icon class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-primary">编辑角色</p>
      </div>
    </template>
    <template #default>
      <suspense>
        <template #fallback>
          <base-loading />
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
  import('./components/EditAsync.vue')
)
</script>