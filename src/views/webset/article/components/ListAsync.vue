<template>
  <main class="space-y-2 py-4">
    <!-- section: 筛选区 -->
    <section
      ref="filterRef"
      class="flex flex-wrap"
    >
      <!-- 类别 -->
      <div class="mr-10 mb-4 w-72 f-c space-x-2">
        <p class="shrink-0 text-sm">类别：</p>
        <n-select
          v-model:value="filter.data.clazzid"
          :options="filter.clazzOptions"
          filterable clearable
        />
      </div>
      <!-- btn --> 
      <div class="mr-10 mb-4 f-c space-x-4">
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
        @click="$router.push('/webset/article/add')"
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
import api from '@/api/index'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { pickBy } from 'lodash-es'
import type { DataTableFilterState } from 'naive-ui'
import type { ParamsInter, FilterInter, TableInter } from '@/types/webset/article'

const router = useRouter()
const clientHeight = useWindowSize().height
const message = useMessage()
const dialog = useDialog()

const params:ParamsInter = reactive({
  size: 20,
  currentPage: 1,
  clazzid: 0
})

router.beforeEach((to, from, next) => {
  if (from.name === 'WebsetArticleEdit') {
    table.loading = true
    table.getList(true)
  }
  next()
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
      if (item.key === 'clazzname') item.filterOptionValue = params.clazzid = filter.data.clazzid = null
    })
    nextTick(() => table.getList(false))
  },
  // 查询
  search: () => {
    table.loading = true
    params.clazzid = filter.data.clazzid
    table.columns.forEach(item => {
      if (item.key === 'clazzname') item.filterOptionValue = params.clazzid = filter.data.clazzid
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
      width: '100', 
      align: 'center'
    },
    { 
      title: "标题", 
      key: "title", 
      align: 'center'
    },
    { 
      title: "排序", 
      key: "ordervalue", 
      width: '100', 
      align: 'center'
    },
    { 
      title: "创建时间", 
      key: "inserttime", 
      align: 'center'
    },
    { 
      title: "更新时间", 
      key: "inserttime", 
      align: 'center'
    },
    { 
      title: "分类", 
      key: "clazzname", 
      align: 'center',
      filter: true,
      filterMultiple: false,
      filterOptionValue: null,
      filterOptions: filter.clazzOptions
    },
    { 
      title: "操作", 
      key: "", 
      align: 'center',
      fixed: 'right',
      render(row: {
        id: number
        name: string
      }) {
        return h(
          'div', { class: 'f-c-c space-x-2.5' }, [
            h(NButton, {
              type: 'primary', 
              text: true, 
              onClick: () => { router.push(`/webset/article/edit/${row.id}`) }
            }, { 
              default: () => '编辑' 
            }),
            h(NButton, {
              type: 'error', 
              text: true, 
              onClick: () => {
                dialog.info({
                  title: '提示',
                  content: `确定要删除该文章吗？`,
                  positiveText: '确定',
                  negativeText: '取消',
                  onPositiveClick: () => {
                    table.loading = true
                    api.get('/article/deleteArticle', {id: row.id}).then((res) => {
                      if (res.code === 200) {
                        message.success('操作成功')
                        table.getList(true)
                      } else {
                        message.warning(res.msg)
                        table.loading = false
                      }
                    })
                  },
                  onNegativeClick: () => {}
                })
              }
            }, { 
              default: () => '删除'
            })
          ]
        )
      }
    },
  ],
  handleFiltersChange: (filters: DataTableFilterState) => {
    table.loading = true
    table.columns.forEach(item => {
      if (item.key === 'clazzname') {
        item.filterOptionValue = params.clazzid = filter.data.clazzid = filters.clazzname as number | null
      }
    })
    nextTick(() => table.getList(false))
  }
})

const clazzRes = await api.get('/article/getArticleClazz')
if (clazzRes.code === 200) {
  filter.clazzOptions = clazzRes.data
  table.columns.forEach(item => {
    if (item.key === 'clazzname') item.filterOptions = clazzRes.data
  })
}
</script>