<template>
  <div class="h-auto space-y-3">
    <div class="flex space-x-3">
      <div class="w-2/5 shrink-0">
        <n-card class="h-full">
          <div class="f-c space-x-4">
            <div class="size-14 shrink-0 overflow-hidden rounded-full">
              <img :src="avatarImg" alt="" />
            </div>
            <div class="grow space-y-1">
              <p class="text-xl">Hello, {{ userStore.user.name }}</p>
              <p class="opacity-50">拿手菜： 九转大肠</p>
            </div>
          </div>
          <p class="mt-7 text-sm opacity-60">
            一个人几乎可以在任何他怀有无限热忱的事情上成功。
          </p>
          <p class="mt-3 text-right text-xs opacity-40">
            —— 查尔斯·史考伯
          </p>
        </n-card>
      </div>
      <div class="grow">
        <n-card
          title="✨ 欢迎使用「 LT转运后台管理系统 」"
          class="h-full"
        >
          <p class="opacity-60">
            这是一款极简风格的后台管理系统，前端使用 Vite + Vue3 + Pinia + tailwindCss，简单易用，赏心悦目，历经十几次重构和细节打磨，诚意满满！！
          </p>
          <footer class="f-c-e mt-3 space-x-4">
            <n-button
              type="primary"
              ghost
              tag="a"
              href="https://speedhigh.github.io/reading/src/index.html#about"
              target="__blank"
            >
              👤 关于我
            </n-button>
          </footer>
        </n-card>
      </div>
    </div>
    <div class="flex space-x-3">
      <div class="w-3/5 shrink-0">
        <n-card
          title="💯 特性"
          segmented
          class="h-full"
        >
          <template #header-extra>
            <span class="text-highlight opacity-90">👏 历经十几次重构和细节打磨</span>
          </template>

          <ul class="opacity-90">
            <li class="py-2">
              🚀 使用
              <b>Vue3</b>
              主流技术栈:
              <span class="text-highlight">Vite + Vue3 + Typescript + Pinia</span>
            </li>
            <li class="py-2">
              ⚡️  使用
              <b>原子CSS</b>
              框架:
              <span class="text-highlight">Tailwindcss</span>
              ，优雅、轻量、易用
            </li>
            <li class="py-2">
              🎨 使用 Naive UI，
              <span class="text-highlight">极致简洁的代码风格和清爽的页面设计</span>
              ，审美在线，主题轻松定制
            </li>
            <li class="py-2">
              🍒 先进且易于理解的文件结构设计，多个模块之间
              <b>零耦合</b>
              ，单个业务模块删除不影响其他模块
            </li>
            <li class="py-2">
              🍉
              <span class="text-highlight">扁平化路由</span>
              设计，每一个组件都可以是一个页面，告别多级路由 KeepAlive 难实现问题
            </li>
          </ul>

          <n-divider class="mb-0! mt-12!">
            <p class="text-14 opacity-60">更多实用功能，持续开发中...</p>
          </n-divider>
        </n-card>
      </div>
      <div class="grow">
        <n-card
          title="🌈 当前主题色"
          segmented
          class="h-full"
        >
          <ul class="space-y-2">
            <li class="f-c space-x-2">
              <p class="w-48 shrink-0">primaryColor：</p>
              <div class="size-3 shrink-0 rounded-full bg-primary"></div>
              <p class="text-primary">{{ themeStore.themeOverrides.common?.primaryColor }}</p>
            </li>
            <li class="f-c space-x-2">
              <p class="w-48 shrink-0">primaryColorHover：</p>
              <div
                class="size-3 shrink-0 rounded-full"
                :style="`background-color: ${themeStore.themeOverrides.common?.primaryColorHover}`"
              ></div>
              <p :style="`color: ${themeStore.themeOverrides.common?.primaryColorHover}`">{{ themeStore.themeOverrides.common?.primaryColorHover }}</p>
            </li>
            <li class="f-c space-x-2">
              <p class="w-48 shrink-0">primaryColorPressed：</p>
              <div
                class="size-3 shrink-0 rounded-full"
                :style="`background-color: ${themeStore.themeOverrides.common?.primaryColorPressed}`"
              ></div>
              <p :style="`color: ${themeStore.themeOverrides.common?.primaryColorPressed}`">{{ themeStore.themeOverrides.common?.primaryColorPressed }}</p>
            </li>
            <li class="f-c space-x-2">
              <p class="w-48 shrink-0">primaryColorSuppl：</p>
              <div
                class="size-3 shrink-0 rounded-full"
                :style="`background-color: ${themeStore.themeOverrides.common?.primaryColorSuppl}`"
              ></div>
              <p :style="`color: ${themeStore.themeOverrides.common?.primaryColorSuppl}`">{{ themeStore.themeOverrides.common?.primaryColorSuppl }}</p>
            </li>
          </ul>
          <p class="mt-16 text-sm opacity-60">
            我去除了大部分的肠的腥味，但是我保留了一部分，我觉得保留一部分肠的味道，才知道你吃的是大肠。
          </p>
          <p class="mt-3 text-right text-xs opacity-40">
            —— 小胖
          </p>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, useUserStore } from '@/store'
import avatarImg from '@/assets/images/logo.webp'

const userStore = useUserStore()
const themeStore = useThemeStore()
</script>

<style scoped>
.text-highlight {
  @apply rounded px-2 py-0.5 bg-[#eaf0f1] dark:bg-gray-700;
}
</style>
