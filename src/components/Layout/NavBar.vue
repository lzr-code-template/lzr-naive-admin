<template>
  <div class="shrink-0 h-16 bg-gray-900 text-white f-c z-50 pr-4 border-b border-gray-700">
    <!-- 左侧按钮 -->
    <div class="grow h-full f-c">
      <!-- 首页logo -->
      <button
        class="w-[255px] h-full hover:bg-gray-700/80"
        :class="{ 'bg-gray-700 border-x border-x-gray-500': !navKey }"
        @click="changeNav('main')"
      >
        <h1>IDC（数据服务系统）</h1>
      </button>
      <!-- 循环头部菜单 -->
      <button
        v-for="item in navList"
        :key="item.key"
        class="w-32 h-full hover:bg-gray-700/80 border-gray-500 f-c-c space-x-2"
        :class="{ 'bg-gray-700 border-x border-x-gray-500': item.key === navKey }"
        @click="changeNav(item.key)"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-sm">{{ item.label }}</span>
      </button>
    </div>
    <!-- 右侧按钮 -->
    <div class="shrink-0 f-c space-x-5">
      <!-- 全屏切换 -->
      <button class="w-8 h-8" @click="toggle">
        <el-tooltip content="全屏切换">
          <component 
            :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon" 
            class="w-5 h-5" 
          />
        </el-tooltip>
      </button>
      <!-- 头像 -->
      <el-dropdown>
        <button class="flex items-center cursor-pointer">
          <div class="w-8 h-8 bg-gray-700 rounded-full f-c-c">
            <UserIcon class="w-5 h-5 text-gray-300" />
          </div>
          <p class="ml-3 mr-2 text-white">{{ user.name }}</p>
          <ChevronDownIcon class="w-4 h-4 text-white" />
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div 
                class="flex items-center space-x-2"
                @click="$router.push('/')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <p>首页</p>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div 
                class="flex items-center space-x-2"
                @click="logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                </svg>
                <p>退出登录</p>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/until/mitt'
import {
  AcademicCapIcon,
  DocumentTextIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  ArrowsPointingOutIcon, 
  ArrowsPointingInIcon
} from '@heroicons/vue/24/outline'
import { UserIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useFullscreen } from '@vueuse/core'
import type { NavListType } from '@/types/layout.ts'

const route = useRoute()
const router = useRouter()
const $cookies = inject<any>('$cookies')
const user = $cookies.get('user')

watch(() => route.path, () => {
  navKey.value = route.meta.class1 as string
})

/* 头部菜单列表 */
const navKey = ref<string>( route.meta.class1 as string )
const navList:NavListType = [
  { label: '医务中心', key: 'medical', icon: AcademicCapIcon },
  { label: '订单中心', key: 'order', icon: DocumentTextIcon },
  { label: '财务中心', key: 'finance', icon: CircleStackIcon },
  { label: '系统管理', key: 'system', icon: WrenchScrewdriverIcon },
]
const changeNav = (key:string):void => {
  navKey.value = key
  emitter.emit('changeNav', key)
  if (key === 'main') router.push('/')
}
/* 全屏切换 */
const { isFullscreen, toggle } = useFullscreen()
/* 退出登录 */
const logout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '提示').then(() => {
    $cookies.remove('user')
    $cookies.remove('token')
    ElMessage({ type: 'success', message: '成功退出登录' })
    router.replace('/account/login')
  }).catch(() => {})
}
</script>