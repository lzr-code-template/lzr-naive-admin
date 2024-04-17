<template>
  <header class="shrink-0 h-14 bg-white shadow-md shadow-primary/10 px-6 f-c-b z-20">
    <component 
      :is="collapsed ? Bars3Icon : Bars3CenterLeftIcon" 
      class="w-5 h-5 text-t2 hover:text-t3 cursor-pointer"
      @click="collapsedChange"
    />
    <div class="f-c space-x-5"> 
      <!-- 全屏切换 -->
      <button 
        class="w-8 h-8" 
        @click="toggle"
      >
        <n-tooltip>
          <template #trigger>
            <component 
              :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon" 
              class="w-5 h-5 text-t2 hover:text-t3" 
            />
          </template>
          <span>全屏切换</span>
        </n-tooltip>
      </button>
      <!-- 头像 -->
      <n-dropdown 
        trigger="hover" 
        :options="options"
        @select="handleSelect"  
      >
        <button class="group flex items-center cursor-pointer">
          <div class="w-8 h-8 bg-gray-100 rounded-full f-c-c">
            <UserIcon class="w-5 h-5 text-gray-400" />
          </div>
          <p class="ml-2.5 mr-1">{{ user.name }}</p>
          <ChevronDownIcon class="mt-1 w-4 h-4" />
        </button>
      </n-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { UserIcon, ChevronDownIcon, Bars3CenterLeftIcon, Bars3Icon } from '@heroicons/vue/24/solid'
import { HomeIcon, PowerIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '@/store/layout'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const $cookies = inject<any>('$cookies')
const user = $cookies.get('user')
const { collapsed, collapsedChange } = toRefs(useLayoutStore())

/* 全屏切换 */
const { isFullscreen, toggle } = useFullscreen()

/* 个人信息下拉菜单 */
const options = [
  { 
    label: '首页', 
    key: 'home', 
    icon: () => h(HomeIcon, { class: 'ml-0.5 w-[1.125rem] h-[1.125rem]' }) 
  },
  { 
    label: '退出登录', 
    key: 'logout',
    icon: () => h(PowerIcon, { class: 'ml-0.5 w-[1.125rem] h-[1.125rem]' }) 
  }
]
const handleSelect = (key: string) => {
  if (key === 'home') {
    router.push('/')
  } 
  if (key === 'logout') {
    dialog.info({
      title: '提示',
      content: '您确定要退出登录吗',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        $cookies.remove('user')
        $cookies.remove('token')
        message.success('成功退出登录')
        router.replace('/account/login')
      },
      onNegativeClick: () => {}
    })
  }
}
</script>