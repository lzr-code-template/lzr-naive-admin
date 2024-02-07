<template>
  <div class="shrink-0 w-64 flex">
    <!-- sidebar（侧边栏2级） -->
    <el-scrollbar class="w-2/5 h-full bg-gray-800 text-white text-sm shadow">
      <button
        v-for="item in sidebarList"
        :key="item.key"
        :aria-label="item.label"
        class="w-full h-12 text-white/80 hover:text-white hover:bg-gray-500/30"
        :class="{'bg-gray-500/30': sidebarKey === item.key}"
        @mouseenter="changeSidebarKey(item.list, item.key)"
      >
        {{ item.label }}
      </button>
    </el-scrollbar>
    <!-- sidebar2（侧边栏3级） -->
    <el-scrollbar class="w-3/5 h-full bg-white text-sm shadow">
      <button
        v-for="item in subSidebarList"
        :key="item.key"
        :aria-label="item.label"
        class="w-full h-12 hover:bg-gray-500/10"
        :class="{'bg-gray-500/20 border-r-2 border-r-primary': $route.meta.class1 === headerKey && $route.meta.class2 === sidebarKey && $route.meta.class3 === item.key}"
        @click="$router.push(item.url)"
      >
        {{ item.label }}
      </button>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/until/mitt'
import type { SidebarDataInter, SidebarListType, SubSidebarListType, SidebarItemInter } from '@/types/layout'

onMounted(() => {
  emitter.on('changeNav', (k) => {
    headerKey.value = k as string
  })
})
const route = useRoute()
const sidebarData: SidebarDataInter = {
  main: [
    {
      label: '工作台',
      key: 'home',
      list: [
        { label: '首页', key: 'index', url: '/home' },
      ]
    }
  ],
  medical: [
    {
      label: '指南统计',
      key: 'guide',
      list: [
        { label: '指南明细', key: 'details', url: '/medical-guide-details' },
      ]
    },
    {
      label: '医院统计',
      key: 'hospital',
      list: [
        { label: '医院日统计', key: 'day', url: '/medical-hospital-day' },
        { label: '医院月统计', key: 'month', url: '/medical-hospital-month' },
      ]
    },
    {
      label: '医生统计',
      key: 'doctor',
      list: [
        { label: '医生日统计', key: 'day', url: '/medical-doctor-day' },
        { label: '医生月统计', key: 'month', url: '/medical-doctor-month' },
      ]
    }
  ],
  order: [
    {
      label: '订单统计',
      key: 'stat',
      list: [
        { label: '订单明细', key: 'details', url: '/order-stat-details' },
        { label: '订单日统计', key: 'day', url: '/order-stat-day' },
        { label: '订单月统计', key: 'month', url: '/order-stat-month' }
      ]
    },
  ],
  finance: [
    {
      label: '医院财务',
      key: 'hospital',
      list: [
        { label: '医院日收入', key: 'day', url: '/finance-hospital-day' },
        { label: '医院月收入', key: 'month', url: '/finance-hospital-month' }
      ]
    },
    {
      label: '医生财务',
      key: 'doctor',
      list: [
        { label: '医生日收入', key: 'day', url: '/finance-doctor-day' },
        { label: '医生月收入', key: 'month', url: '/finance-doctor-month' }
      ]
    },
    {
      label: '平台财务',
      key: 'platform',
      list: [
        { label: '平台日收入', key: 'day', url: '/finance-platform-day' },
        { label: '平台月收入', key: 'month', url: '/finance-platform-month' }
      ]
    },
  ],
  system: [
    {
      label: '权限管理',
      key: 'permission',
      list: [
        { label: '角色管理', key: 'role', url: '/system-permission-role' },
        { label: '账号管理', key: 'account', url: '/system-permission-account' }
      ]
    },
  ]
}
const headerKey = ref<string>(route.meta.class1 as string)
const sidebarKey = ref<string>(route.meta.class2 as string)
const sidebarList = computed(():SidebarListType => sidebarData[headerKey.value])
const subSidebarList = ref<SubSidebarListType | any>([])
const changeSidebarKey = (list:SubSidebarListType, key:string):void => {
  subSidebarList.value = list
  sidebarKey.value = key
}
watchEffect(() => {
  if (route.meta.class1 === headerKey.value) {
    let obj:SidebarItemInter = sidebarData[headerKey.value].find(item => item.key === route.meta.class2) as SidebarItemInter
    sidebarKey.value = obj.key
    subSidebarList.value = obj.list
  } else {
    sidebarKey.value = sidebarData[headerKey.value][0].key
    subSidebarList.value = sidebarData[headerKey.value][0].list
  }
})
</script>