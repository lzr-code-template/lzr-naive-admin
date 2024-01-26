<template>
  <div class="shrink-0 w-64 flex">
    <!-- sidebar（侧边栏2级） -->
    <el-scrollbar class="w-2/5 h-full bg-gray-800 text-white">
      <div v-for="i in 20" :key="i" class="h-12 bg-gray-500">
        {{ i }}
      </div>
    </el-scrollbar>
    <!-- sidebar2（侧边栏3级） -->
    <el-scrollbar class="w-3/5 h-full bg-white">
      <div v-for="i in 10" :key="i" class="h-12 mb-12">
        {{ i }}
      </div>
    </el-scrollbar>
  </div>
</template>