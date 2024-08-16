<template>
  <header class="f-c-b z-20 h-14 shrink-0 bg-white px-6 shadow-md shadow-primary/10">
    <button
      class="group size-8"
      @click="collapsedChange"
    >
      <component
        :is="collapsed ? Bars3Icon : Bars3CenterLeftIcon"
        class="size-5 text-t2 group-hover:text-t3"
      />
    </button>
    <div class="f-c space-x-5">
      <!-- 全屏切换 -->
      <button
        class="group size-8"
        @click="toggle"
      >
        <component
          :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon"
          class="size-5 text-t2 group-hover:text-t3"
        />
      </button>
      <!-- 头像 -->
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="handleSelect"
      >
        <button class="group flex cursor-pointer items-center">
          <div class="f-c-c size-8 rounded-full bg-gray-100">
            <UserIcon class="size-5 text-gray-400" />
          </div>
          <p class="ml-2.5 mr-1">{{ useUserStore().user.name }}</p>
          <ChevronDownIcon class="mt-1 size-4" />
        </button>
      </n-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { Bars3CenterLeftIcon, Bars3Icon, ChevronDownIcon, UserIcon } from '@heroicons/vue/24/solid'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, HomeIcon, PowerIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '@/store/layout'
import { useUserStore } from '@/store/user'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const { collapsed, collapsedChange } = toRefs(useLayoutStore())

/* 全屏切换 */
const { isFullscreen, toggle } = useFullscreen()

/* 个人信息下拉菜单 */
const options = [
  {
    label: '首页',
    key: 'home',
    icon: () => h(HomeIcon, { class: 'ml-0.5 w-[1.125rem] h-[1.125rem]' }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(PowerIcon, { class: 'ml-0.5 w-[1.125rem] h-[1.125rem]' }),
  },
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
        useUserStore().initUser()
        localStorage.clear()
        message.success('成功退出登录')
        router.replace('/account/login')
      },
      onNegativeClick: () => {},
    })
  }
}
</script>
