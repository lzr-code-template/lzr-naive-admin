<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <button class="group flex cursor-pointer items-center">
      <div class="f-c-c size-8 overflow-hidden rounded-full bg-gray-100">
        <UserIcon class="size-5 text-gray-400" />
        <img :src="avatarImg" alt="avatarImg" />
      </div>
      <p class="ml-2.5 mr-1">{{ userStore.user.name }}</p>
      <ChevronDownIcon class="size-4" />
    </button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { ChevronDownIcon, UserIcon } from '@heroicons/vue/24/solid'
import { HomeIcon, PowerIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/store'
import avatarImg from '@/assets/images/logo.webp'

const router = useRouter()
const userStore = useUserStore()

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
    window.$dialog?.info({
      title: '提示',
      content: '您确定要退出登录吗',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        ['token', 'user'].forEach(item => localStorage.removeItem(item))
        userStore.initUser()
        window.$message?.success('成功退出登录')
        router.replace('/account/login')
      },
      onNegativeClick: () => {},
    })
  }
}
</script>
