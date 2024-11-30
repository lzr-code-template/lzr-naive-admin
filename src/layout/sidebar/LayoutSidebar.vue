<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger="bar"
    :native-scrollbar="false"
    @collapse="collapsed = true"
    @expand="collapsed = false"
    @update:collapsed="collapsedUpdate"
  >
    <div class="f-c-c h-14 cursor-default border-b dark:border-gray-700">
      <n-avatar
        v-if="collapsed"
        :src="logoImg"
        size="large"
      />
      <h1 class="text-lg font-bold dark:text-white">{{ title }}</h1>
    </div>
    <div class="pt-2">
      <n-menu
        v-model:value="active"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import logoImg from '@/assets/images/logo.webp'
import { useLayoutStore } from '@/store'
import { HomeIcon} from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

const route = useRoute()
const { title, collapsed, collapsedUpdate } = toRefs(useLayoutStore())
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '工作台' }),
    key: 'Home',
    icon: () => h(HomeIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: undefined,
  },
]

const active = ref<string>(route.meta.name ? route.meta.name as string : 'Home')
watch(() => route.meta.name, (newValue) => {
  active.value = newValue ? newValue as string : 'Home'
})
</script>
