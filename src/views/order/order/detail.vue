<template>
  <page-card>
    <template #default>
      <suspense>
        <template #fallback>
          <BaseLoading />
        </template>
        <template #default>
          订单详情
        </template>
      </suspense>
    </template>
  </page-card>
</template>

<script setup>
import BaseLoading from '@/components/Base/BaseLoading.vue'
</script>
