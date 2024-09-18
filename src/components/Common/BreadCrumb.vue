<template>
  <div
    v-if="isNonEmptyArray(breadItems)"
    class="f-c h-14 cursor-default border-b dark:border-b-gray-700"
  >
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="(item, index) in breadItems"
        :key="index"
        :clickable="!!item.path"
      >
        <template v-if="!item.breadKey">
          <p
            :class="{ 'font-bold text-primary': breadItems.length - 1 === index }"
            @click="breadItems.length - 1 !== index && router.push(item.path)"
          >
            {{ item.title }}
          </p>
        </template>
        <template v-else>
          <n-dropdown
            :options="optionsList[item.breadKey]"
            @select="handleDropSelect"
          >
            <div class="flex h-4 items-center space-x-0.5 text-gray-400 hover:text-gray-500 hover:dark:text-gray-300">
              <component
                :is="item.icon"
                v-if="item.icon"
                class="size-4"
              />
              <p>{{ item.title }}</p>
            </div>
          </n-dropdown>
        </template>
        <template #separator>
          <div>
            <ChevronRightIcon class="-mx-1 size-3.5 text-gray-400" />
          </div>
        </template>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { isNonEmptyArray } from '@/utils'

const route = useRoute()
const router = useRouter()
const breadItems: any = computed(() => {
  return route.matched.filter(item => item.name === route.name)[0].meta.breadItems || []
})

const handleDropSelect = (name: string) => {
  if (name !== route.name) {
    router.push({ name })
  }
}

const optionsList: any = reactive({
  order: [
    { label: '订单管理', key: 'OrderOrder' },
  ],
  webset: [
    { label: '轮播图', key: 'WebsetSwiper' },
    { label: '邮件模版', key: 'WebsetMail' },
    { label: '文章管理', key: 'WebsetArticle' },
    { label: '增值服务', key: 'WebsetAddserve' },
  ],
  user: [
    { label: '用户列表', key: 'UserUser' },
    { label: '身份证列表', key: 'UserIDcard' },
  ],
  system: [
    { label: '角色管理', key: 'SystemRole' },
    { label: '账号管理', key: 'SystemAccount' },
  ],
})
</script>

<style>
.n-breadcrumb ul {
  @apply flex items-center;
}
</style>
