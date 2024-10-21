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
        :scroll-x="1280"
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
  state: '0',
})
const columns = [
  {
    title: '订单信息',
    width: 28,
    render(row: any) {
      return h(
        'div',
        { class: 'space-y-1 text-left' },
        [
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '订单编号：'),
            h('span', {}, row.id),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '下单时间：'),
            h('span', {}, row.inserttime),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '卖家名称：'),
            h('span', {}, '卖家名称'),
          ]),
          h('p', { class: 'text-primary' }, [
            h('span', { class: 'text-gray-400' }, '订单状态：'),
            h('span', {}, row.stateText),
          ]),
        ],
      )
    },
  },
  {
    title: '商品信息',
    width: 45,
    render(row: any) {
      return h(
        'div',
        { class: 'f-s space-x-3' },
        [
          h('div', { class: 'shrink-0 w-18 h-18 rounded-md overflow-hidden' }, [
            h('img', { alt: '商品图片', width: 72, height: 72, src: row.bidPre.thumbnail, class: 'w-20 h-20 object-cover' }),
          ]),
          h('div', { class: 'grow text-left' }, [
            h(NEllipsis, { lineClamp: 2, class: 'h-11' }, {
              default: () => row.bidPre.name,
            }),
            h('div', { class: 'mt-2 mb-1 text-error' }, [
              h('span', { class: 'text-base' }, row.bidPre.bidprice),
              h('span', { class: 'ml-1 text-xs' }, '日元'),
            ]),
            row.state === 4
              ? h(NButton, {
                'v-if': row.state === '4',
                'type': 'primary',
                'size': 'small',
                'text': true,
                'onClick': () => router.push(`/order/order/detail/${row.id}`),
              }, {
                default: () => '商品入库 >',
              })
              : false,
          ]),
        ],
      )
    },
  },
  {
    title: '用户 / 收货人',
    width: 35,
    render() {
      return h(
        'div',
        { class: 'space-y-1 text-left' },
        [
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '下单用户：'),
            h('span', {}, '大西瓜球'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '收货人：'),
            h('span', {}, '李梓瑞 15166135648'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400' }, '收货地址：'),
            h('span', {}, '山东省威海市环翠区皇冠街道青岛中路时代嘉园C栋2单元1603'),
          ]),
        ],
      )
    },
  },
  {
    title: '支付金额',
    width: 30,
    render() {
      return h(
        'div',
        { class: 'space-y-1 text-left' },
        [
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '竞拍金额：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '日本邮费：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '增值服务费：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '固定服务费：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '保险费：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '仓储费：'),
            h('span', {}, '13200日元'),
          ]),
          h('p', { class: '' }, [
            h('span', { class: 'text-gray-400 w-[5.25rem] inline-block' }, '日本运费：'),
            h('span', {}, '13200日元'),
          ]),
        ],
      )
    },
  },
  {
    title: '操作',
    key: '',
    width: 15,
    align: 'left',
    fixed: 'right',
    render(row: any) {
      return h(
        'div',
        { class: 'text-left' },
        [
          h(
            'div',
            { class: 'mr-2 mb-1' },
            h(NButton, {
              type: 'primary',
              text: true,
              onClick: () => router.push(`/order/order/detail/${row.id}`),
            }, {
              default: () => '订单详情',
            }),
          ),
          h(
            'div',
            { class: 'mr-2 mb-1' },
            h(NButton, {
              type: 'primary',
              text: true,
            }, {
              default: () => '包裹详情',
            }),
          ),
          h(
            'div',
            { class: 'mr-2 mb-1' },
            h(NButton, {
              type: 'primary',
              text: true,
            }, {
              default: () => '包裹审核',
            }),
          ),
          h(
            'div',
            { class: 'mr-2 mb-1' },
            h(NButton, {
              type: 'primary',
              text: true,
            }, {
              default: () => '打印出货单',
            }),
          ),
          h(
            'div',
            { class: 'mr-2 mb-1' },
            h(NButton, {
              type: 'primary',
              text: true,
            }, {
              default: () => '国际快递单号',
            }),
          ),
        ],
      )
    },
  },
]
/** section2 表单区 */
const { table } = useTable('/order0/getOrderPage', params, columns)

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
