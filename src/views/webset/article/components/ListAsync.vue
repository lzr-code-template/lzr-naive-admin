<template>
  <main class="space-y-2 py-4">
    <!-- section: 筛选区 -->
    <section
      ref="filterRef"
      class="flex flex-wrap"
    >
  
    </section>
  </main>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { debounce, pick, pickBy } from 'lodash-es'
import type { FormInst, FormItemRule } from 'naive-ui'
import type { ParamsInter, FilterInter, TableInter } from '@/types/webset/article'

const router = useRouter()
const clientHeight = useWindowSize().height
const params:ParamsInter = reactive({
  size: 20,
  currentPage: 1,
  clazzid: 0
})

onMounted(() => {
  table.getList(false)        // 获取表单
})

/** section1 筛选区 **/
const filterRef = ref()
const filter:FilterInter = reactive({
  // 筛选区所占高度
  height: useElementSize(filterRef).height,
  // 分类 options
  clazzOptions: [],
  // 筛选区数据
  data: {
    clazzid: null,    // 分类id
  },
  // 重置
  reset: () => {
    table.loading = true
    filter.data.clazzid = params.clazzid = null
    table.columns.forEach(item => {
      if (item.key === 'clazzid') item.filterOptionValue = params.clazzid = filter.data.clazzid = null
    })
    nextTick(() => table.getList(false))
  },
  // 查询
  search: () => {
    table.loading = true
    params.clazzid = filter.data.clazzid
    table.columns.forEach(item => {
      if (item.key === 'clazzid') item.filterOptionValue = params.clazzid = filter.data.clazzid
    })
    nextTick(() => table.getList(false))
  }
})

/** section2 表单区 **/
const table: TableInter = reactive({
  loading: true,
  list: [],
  getList: (more = true) => {
    if (!more) params.currentPage = table.pagination.page = 1
    api.get('/article/getArticlePage', pickBy(params, (value: ParamsInter) => {
      return typeof(value) === 'number' && value === 0 || Boolean(value)
    })).then((res) => {
      if (res.code === 200) {
        table.pagination.itemCount = res.data.total
        table.list = res.data.records || []
      } else {
        table.pagination.itemCount = 0
        table.list = []
      }
      nextTick(() => table.loading = false)
    })
  },
  pagination: {
    page: params.currentPage,
    pageSize: params.size,
    pageSizes: [
      { label: '5条', value: 5 },
      { label: '10条', value: 10 },
      { label: '15条', value: 15 },
      { label: '20条', value: 20 },
      { label: '50条', value: 50 }
    ],
    itemCount: 0,
    showSizePicker: true,
    showQuickJumper: true,
    displayOrder: ['size-picker', 'pages', 'quick-jumper'],
    prefix ({ itemCount }: { itemCount: number}) {
      return `共 ${itemCount} 条，每页`
    },
    onUpdatePage: (page: number) => {
      table.loading = true
      params.currentPage = table.pagination.page = page
      nextTick(() => table.getList(true))
    },
    onUpdatePageSize: (pageSize: number) => {
      table.loading = true
      params.size = table.pagination.pageSize = pageSize
      nextTick(() => table.getList(false))
    } 
  },
  columns: [
    { 
      title: "序号", 
      width: '70', 
      align: 'center',
      render(_: object, index: number) { return `${(table.pagination.page - 1) * table.pagination.pageSize + index + 1 }` }
    },
    { 
      title: "ID", 
      key: "id", 
      align: 'center'
    },
    { 
      title: "标题", 
      key: "title", 
      align: 'center'
    },
    { 
      title: "分类", 
      key: "clazzname", 
      align: 'center'
    },
    { 
      title: "角色", 
      key: "rolename", 
      align: 'center'
    },
    { 
      title: "状态", 
      key: "zaixian",
      align: 'center',
      render(row: {
        id: number
        name: string
        zaixian: string
      }) {
        return h(
          NTag, {
            class: '-ml-5',
            size: 'small',
            bordered: false,
            type: +row.zaixian === 0 ? 'error' : 'success'
          },{
            default: () => +row.zaixian === 0 ? '禁用' : '启用'
          }
        )
      },
      filter: true,
      filterMultiple: false,
      filterOptionValue: null,
      filterOptions: filter.zaixianOptions
    },
    { 
      title: "操作", 
      key: "", 
      align: 'center',
      fixed: 'right',
      render(row: {
        id: number
      }) {
        return h(
          'div', { class: 'f-c-c space-x-2.5' }, [
            h(NButton, {
              type: 'primary', 
              text: true, 
              onClick: () => modal.open('编辑账号', row.id)
            }, { 
              default: () => '编辑' 
            })
          ]
        )
      }
    },
  ],
})

const roleRes = await api.get('/article/getArticleClazz')
if (roleRes.code === 200) filter.clazzOptions = roleRes.data
</script>