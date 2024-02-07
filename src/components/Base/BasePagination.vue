<template>
  <div class="h-full flex flex-col space-y-4">
    <div class="grow overflow-hidden">
      <slot></slot>
    </div>
    <div class="shrink-0 ml-auto">
      <el-pagination
        :="$attrs"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const $attrs = useAttrs()
</script>