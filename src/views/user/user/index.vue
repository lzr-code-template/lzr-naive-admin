<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          用户列表
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup>
import BaseLoading from '@/components/Base/BaseLoading.vue'
</script>
