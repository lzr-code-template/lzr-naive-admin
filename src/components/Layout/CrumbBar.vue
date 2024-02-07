<template>
  <div class="shrink-0 w-full h-12 bg-white text-sm shadow flex items-center px-4">
    <button 
      class="flex items-center space-x-1"
      :class="$route.path === '/home' ? 'text-primary cursor-default' : 'text-gray-600 hover:text-primary'"
      @click="$router.push('/')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
      <span>首页</span>
    </button>
    <p v-if="$route.path !== '/home'" class="mx-1.5">/</p>
    <div v-for="(item, index) in breadcrumbList" :key="index">
      <span 
        :class="item.name ? item.name === $route.name ? 'text-primary cursor-default' : 'text-gray-600 cursor-pointer hover:text-primary' : 'text-gray-600 cursor-default'"
        @click="clickBredcrumb(item.name, index)"
      >
        {{ item.title }}
      </span>
      <span v-if="breadcrumbList.length - 1 !== index" class="mx-1.5 cursor-default">/</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbInter } from '@/types/router.ts'

const route = useRoute()
const router = useRouter()

const breadcrumbList = computed(():BreadcrumbInter[] => {
  return route.meta.breadcrumb as BreadcrumbInter[]
})

// 点击面包屑跳转
const clickBredcrumb = (name: string, index: number):void => {
  if(name && index < breadcrumbList.value.length - 1) router.push({name: name})
}
</script>