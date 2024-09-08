<template>
  <n-layout-header class="f-c-b z-20 h-14 px-6" bordered>
    <button
      class="group size-8"
      @click="layoutStore.collapsedChange"
    >
      <component
        :is="layoutStore.collapsed ? Bars3Icon : Bars3CenterLeftIcon"
        class="size-5"
      />
    </button>
    <div class="f-c space-x-4">
      <!-- 暗黑模式 -->
      <button
        class="size-8"
        @click="toggleDark"
      >
        <component
          :is="isDark ? MoonIcon : SunIcon"
          class="size-5"
        />
      </button>
      <!-- 全屏切换 -->
      <button
        class="size-8"
        @click="toggle"
      >
        <component
          :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon"
          class="size-5"
        />
      </button>
      <!-- 设置主题色 -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <div class="f-c-c size-7">
            <n-color-picker
              size="small"
              :value="layoutStore.primaryColor"
              :swatches="primaryColors"
              :on-update:value="(v) => layoutStore.setPrimaryColor(v)"
              :render-label="() => ''"
            />
          </div>
        </template>
        设置主题色
      </n-tooltip>
      <n-divider vertical />
      <!-- 头像 -->
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
          <p class="ml-2.5 mr-1">{{ useUserStore().user.name }}</p>
          <ChevronDownIcon class="size-4" />
        </button>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
import { Bars3CenterLeftIcon, Bars3Icon, ChevronDownIcon, UserIcon } from '@heroicons/vue/24/solid'
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, HomeIcon, MoonIcon, PowerIcon, SunIcon } from '@heroicons/vue/24/outline'
import { getPresetColors } from '@arco-design/color'
import { useLayoutStore } from '@/store/layout'
import { useUserStore } from '@/store/user'
import avatarImg from '@/assets/images/logo.webp'

const layoutStore = useLayoutStore()

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

/* 暗黑模式 */
const isDark = useDark()
const toggleDark = async ({ clientX, clientY }: any) => {
  function handler() {
    layoutStore.toggleDark()
    useToggle(isDark)()
  }

  if (!document.startViewTransition) {
    return handler()
  }

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY),
    )}px at ${clientX}px ${clientY}px)`,
  ]

  await document.startViewTransition(handler).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}

/* 全屏切换 */
const { isFullscreen, toggle } = useFullscreen()

/* 主题色 */
const primaryColors = Object.entries(getPresetColors()).map(([, value]) => value.primary)

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
