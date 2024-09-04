<template>
  <main class="h-full space-y-2 py-4">
    <!-- section1: Filter -->
    <section ref="filterRef">
      <div class="f-c-e space-x-4">
        <router-link
          to="/webset/addserve/add"
          class="w-20"
        >
          <n-throttle-button
            type="primary"
            text="添加"
            block
          />
        </router-link>
      </div>
    </section>
    <!-- section2: Table  -->
    <section class="relative">
      <n-scrollbar :style="{ maxHeight: `${clientHeight - filterHeight - 200}px` }">
        <table
          :bordered="false"
          :single-line="false"
          class="min-w-full table-auto"
        >
          <thead class="sticky top-0 z-10">
            <tr class="bg-gray-100 shadow">
              <th class="text-left">ID</th>
              <th class="text-left">服务名称</th>
              <th class="text-left">金额</th>
              <th class="text-left">状态</th>
              <th class="w-32 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in addServeList"
              :key="item.id"
              class="even:bg-gray-100"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.type }}</td>
              <td class="w-32 text-center">
                <router-link :to="`/webset/addserve/edit/${item.id}`">
                  <n-button text type="primary">编辑</n-button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </n-scrollbar>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useElementSize, useWindowSize } from '@vueuse/core'
import type { ServeInter } from '@/types/webset/addserve'
import api from '@/api/index'

const filterRef = ref<HTMLElement>()
const filterHeight = useElementSize(filterRef).height

const clientHeight = useWindowSize().height

// 服务列表
const addServeList = ref<ServeInter[]>([])

// 懒加载获取数据
const res = await api.get('/serve/getServeList')
if (res.code === 200) {
  addServeList.value = res.data
}
</script>

<style scoped>
th {
  @apply px-4 py-3 border-t-0 border;
}
td {
  @apply px-4 py-3 border;
}
tr {
  @apply border border-gray-100;
}
</style>
