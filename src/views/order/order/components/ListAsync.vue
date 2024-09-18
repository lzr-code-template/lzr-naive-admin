<template>
  <main class="space-y-2 py-4">
    <!-- section: 筛选区 -->
    <section
      ref="filterRef"
      class="flex flex-wrap"
    >
      <!-- 名称 -->
      <div class="f-c-c mb-4 mr-10 w-72 space-x-2">
        <p class="shrink-0 text-sm">名称：</p>
        <n-input
          v-model:value="filter.data.name"
          placeholder="请输入要查询的名称"
          clearable
        >
          <template #suffix>
            <MagnifyingGlassIcon class="size-4 text-gray-400" />
          </template>
        </n-input>
      </div>
      <!-- btn -->
      <div class="f-c mb-4 mr-10 space-x-4">
        <div class="w-20">
          <n-throttle-button
            text="重置"
            block
            @click="filter.reset"
          />
        </div>
        <div class="w-20">
          <n-throttle-button
            type="primary"
            text="查询"
            block
            @click="filter.search"
          />
        </div>
      </div>
      <div
        class="ml-auto w-20"
        @click="console.log('a')"
      >
        <n-button block type="primary">新增</n-button>
      </div>
    </section>
    <!-- section: 表单区 -->
    <section>
      <n-data-table
        remote
        :loading="table.loading"
        :columns="table.columns"
        :data="table.list"
        :pagination="table.pagination"
        :min-height="`${clientHeight - filter.height - 280}`"
        :max-height="`${clientHeight - filter.height - 280}`"
        :scroll-x="1024"
        @update:filters="table.handleFiltersChange"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useElementSize, useWindowSize } from '@vueuse/core'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import api from '@/api/index'
import { useTable } from '@/composables/useTable'
import type { FilterInter, ParamsInter, TabsInter } from '@/types/order/order'

const router = useRouter()
const clientHeight = useWindowSize().height
const params: ParamsInter = reactive({
  size: 20,
  currentPage: 1,
  name: '',
  state: '',
})
const columns = [
  {
    title: '商品信息',
    align: 'center',
    width: 400,
    render(row: any) {
      return h(
        'div',
        { class: 'f-s space-x-3' },
        [
          h('div', { class: 'shrink-0 w-20 h-20 rounded-md overflow-hidden' }, [
            h('img', { alt: '商品图片', width: 80, height: 80, src: row.thumbnail, class: 'w-20 h-20 object-cover' }),
          ]),
          h('div', { class: 'grow text-left' }, [
            h(NEllipsis, { lineClamp: 2 }, row.name),
            h('div', { class: 'mt-1 text-error' }, [
              h('span', { class: 'text-base' }, row.bidprice),
              h('span', { class: 'ml-1 text-xs' }, '日元'),
            ]),
            // h(NTag, { type: 'info', size: 'small' }, row.stateText || '未发货')
          ]),
          // h(NButton, {
          //   type: 'primary',
          //   text: true,
          //   onClick: () => console.log('aa')
          // }, {
          //   default: () => '编辑'
          // })
        ],
      )
    },
  },
  {
    title: '订单编号',
    key: 'id',
    align: 'center',
  },
  {
    title: '下单时间',
    key: 'inserttime',
    align: 'center',
  },
  {
    title: '总金额',
    key: 'priceall',
    align: 'center',
  },
  {
    title: '总金额（人民币）',
    key: 'priceallrmb',
    align: 'center',
  },
  {
    title: '订单状态',
    key: 'stateText',
    align: 'center',
  },
  // {
  //   title: "序号",
  //   width: '70',
  //   align: 'center',
  //   render(_: object, index: number) { return `${(table.pagination.page - 1) * table.pagination.pageSize + index + 1 }` }
  // },
  // {
  //   title: "ID",
  //   key: "id",
  //   align: 'center'
  // },
  // {
  //   title: "姓名",
  //   key: "name",
  //   align: 'center'
  // },
  // {
  //   title: "性别",
  //   key: "gender",
  //   align: 'center',
  //   render(row: {
  //     gender: number
  //   }) { return ['女', '男'][row.gender] }
  // },
  // {
  //   title: "手机号",
  //   key: "mobile",
  //   align: 'center'
  // },
  // {
  //   title: "角色",
  //   key: "rolename",
  //   align: 'center'
  // },
  // {
  //   title: "状态",
  //   key: "zaixian",
  //   align: 'center',
  //   render(row: {
  //     id: number
  //     name: string
  //     zaixian: string
  //   }) {
  //     return h(
  //       NTag, {
  //         class: '-ml-5',
  //         size: 'small',
  //         bordered: false,
  //         type: +row.zaixian === 0 ? 'error' : 'success'
  //       },{
  //         default: () => +row.zaixian === 0 ? '禁用' : '启用'
  //       }
  //     )
  //   },
  //   filter: true,
  //   filterMultiple: false,
  //   filterOptionValue: null,
  //   filterOptions: filter.zaixianOptions
  // },
  {
    title: '操作',
    key: '',
    align: 'center',
    fixed: 'right',
    render(row: {
      id: number
    }) {
      return h(
        'div',
        { class: 'f-c-c space-x-2.5' },
        [
          h(NButton, {
            type: 'primary',
            text: true,
            onClick: () => router.push(`/order/order/detail/${row.id}`),
          }, {
            default: () => '查看详情',
          }),
        ],
      )
    },
  },
]
/** section2 表单区 */
const { table } = useTable('/order/getOrderPage', params, columns)

/** section1 筛选区 */
const filterRef = ref<HTMLElement>()
const filter: FilterInter = reactive({
  // 筛选区所占高度
  height: useElementSize(filterRef).height,
  // 筛选区数据
  data: {
    name: '', // 名称
    roleid: null, // 角色id
  },
  // 重置
  reset: () => {
    table.loading = true
    filter.data.name = params.name = ''
    nextTick(() => table.getList(false))
  },
  // 查询
  search: () => {
    table.loading = true
    params.name = filter.data.name
    nextTick(() => table.getList(false))
  },
})

table.getList(false) // 获取表单
</script>
