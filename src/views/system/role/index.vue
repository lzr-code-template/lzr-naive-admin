<template>
  <page-card>
    <template #header>
      <div class="h-14 border-b f-c space-x-1 text-sm font-normal cursor-default">
        <p class="text-gray-400">系统管理</p>
        <chevron-right-icon class="w-3.5 h-3.5 text-gray-400" />
        <p class="text-primary">角色管理</p>
      </div>
    </template>
    <template #default>
      <main class="space-y-2 py-4">
        <!-- section: 筛选区 -->
        <section
          ref="filterRef"
          class="flex flex-wrap"
        >
          <div class="mr-10 mb-4 w-72 f-c-c space-x-2">
            <p class="shrink-0 text-sm">角色名称：</p>
            <n-input
              v-model:value="filter.data.name"
              placeholder="请输入要查询的名称"
              class="grow"
              clearable
            >
              <template #suffix>
                <magnifying-glass-icon class="w-4 h-4 text-gray-400" />
              </template>
            </n-input>
          </div>
          <!-- 状态 -->
          <div class="mr-10 mb-4 w-72 f-c space-x-2">
            <p class="shrink-0 text-sm">状态：</p>
            <n-select
              v-model:value="filter.data.zaixian"
              :options="filter.zaixianOptions"
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
            @click="$router.push('/system/role/add')"  
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
  </page-card>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { useTable } from '@/composables/useTable'
import type { ParamsInter, FilterInter } from '@/types/system/role'
import type { DataTableFilterState } from 'naive-ui'

defineOptions({
  name: 'SystemRole'
})
onMounted(() => {
  table.getList(false)        // 获取表单
})

const router = useRouter()
router.beforeEach((to, from, next) => {
  if (from.name === 'SystemRoleEdit') {
    table.loading = true
    table.getList(true)
  }
  next()
})
const message = useMessage()
const dialog = useDialog()
const clientHeight = useWindowSize().height
const params: ParamsInter = reactive({
  size: 20,
  currentPage: 1,
  name: '',
  zaixian: null
})

/** section1 筛选区 **/
const filterRef = ref()
const filter:FilterInter = reactive({
  // 筛选区所占高度
  height: useElementSize(filterRef).height,
  // 报告状态 options
  zaixianOptions: [
    { label: '禁用', value: 0 },
    { label: '启用', value: 1 }
  ],
  // 筛选区数据
  data: {
    name: '',           // 名称
    zaixian: null       // 状态
  },
  // 重置
  reset: () => {
    table.loading = true
    filter.data.name = params.name = ''
    table.columns.forEach(item => {
      if (item.key === 'zaixian') item.filterOptionValue = params.zaixian = filter.data.zaixian = null
    })
    nextTick(() => table.getList(false))
  },
  // 查询
  search: () => {
    table.loading = true
    params.name = filter.data.name
    table.columns.forEach(item => {
      if (item.key === 'zaixian') item.filterOptionValue = params.zaixian = filter.data.zaixian
    })
    nextTick(() => table.getList(false))
  }
})

/** section2 表单区 **/
const columns = [
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
    title: "角色名称", 
    key: "name", 
    align: 'center'
  },
  { 
    title: "账号数量", 
    key: "num", 
    align: 'center'
  },
  { 
    title: "创建人", 
    key: "createbyperson", 
    align: 'center'
  },
  { 
    title: "创建时间", 
    key: "inserttime", 
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
          default: () => ['禁用', '启用'][+row.zaixian]
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
      name: string
      zaixian: string
    }) {
      return h(
        'div', { class: 'f-c-c space-x-2.5' }, [
          h(NButton, {
            type: 'primary', 
            text: true, 
            onClick: () => { router.push(`/system/role/edit/${row.id}`) }
          }, { 
            default: () => '编辑' 
          }),
          h(NButton, {
            type: 'error', 
            text: true, 
            onClick: () => {
              dialog.info({
                title: '提示',
                content: `确定要删除该角色吗？`,
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                  table.loading = true
                  api.get('/system/role/deleteAdminRole', {id: row.id}).then((res) => {
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
  }
]
const { table } = useTable('/system/role/getAdminRolePage', params, columns, {
  handleFiltersChange: (filters: DataTableFilterState) => {
    table.loading = true
    table.columns.forEach(item => {
      if (item.key === 'zaixian') {
        item.filterOptionValue = params.zaixian = filter.data.zaixian = filters.zaixian as number | null
      }
    })
    nextTick(() => table.getList(false))
  }
})
</script>