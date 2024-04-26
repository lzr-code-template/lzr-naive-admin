<template>
  <n-layout-sider
    class="shadow-md z-50"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger="bar"
    @collapse="collapsed = true"
    @expand="collapsed = false"
    @update:collapsed="collapsedUpdate"
  >
    <div class="h-14 f-c-c cursor-default">
      <n-avatar 
        v-if="collapsed" 
        :src="logoImg"
        size="large"
      />
      <h1 class="text-lg font-bold">{{ title }}</h1>
    </div>
    <n-menu
      v-model:value="active"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { HomeIcon, DocumentTextIcon, UserIcon, WindowIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import type { MenuOption } from 'naive-ui'
import { useLayoutStore } from '@/store/layout'
import logoImg from '@/assets/images/logo.webp'

const route = useRoute()
const { title, collapsed, collapsedUpdate } = toRefs(useLayoutStore())
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, {to: '/'}, { default: () => '工作台'}), 
    key: 'Home',
    icon: () => h(HomeIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: undefined
  },
  {
    label: '订单管理',
    key: 'Order',
    icon: () => h(DocumentTextIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: [
      { label: () => h(RouterLink, {to: '/order/order'}, { default: () => '订单列表'}),  key: 'OrderOrder' }
    ]
  },
  {
    label: '网站管理',
    key: 'Webset',
    icon: () => h(WindowIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: [
      { label: () => h(RouterLink, {to: '/webset/swiper'}, { default: () => '轮播图'}),  key: 'WebsetSwiper' },
      { label: () => h(RouterLink, {to: '/webset/mail'}, { default: () => '邮件模板'}),  key: 'WebsetMail' },
      { label: () => h(RouterLink, {to: '/webset/article'}, { default: () => '文章管理'}),  key: 'WebsetArticle' },
    ]
  },
  {
    label: '用户管理',
    key: 'User',
    icon: () => h(UserIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: [
      { label: () => h(RouterLink, {to: '/user/user'}, { default: () => '用户列表'}),  key: 'UserUser' },
      { label: () => h(RouterLink, {to: '/user/IDcard'}, { default: () => '身份证列表'}),  key: 'UserIDcard' },
    ]
  },
  {
    label: '系统管理',
    key: 'System',
    icon: () => h(Cog6ToothIcon, { class: '-mt-0.5 w-5 h-5' }),
    children: [
      { label: () => h(RouterLink, {to: '/system/role'}, { default: () => '角色管理'}),  key: 'SystemRole' },
      { label: () => h(RouterLink, {to: '/system/account'}, { default: () => '账号管理'}),  key: 'SystemAccount' }
    ]
  }
]

const active = ref<string>(route.meta.name ? route.meta.name as string : 'Home')
watch(() => route.meta.name, newValue => {
  active.value = newValue ? newValue as string : 'Home'
})
</script>