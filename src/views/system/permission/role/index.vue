<template>
  <main class="h-full space-y-4 flex flex-col">
    <!-- 筛选区 -->
    <section class="shrink-0 bg-white rounded p-4">
      <div class="flex flex-wrap">
        <!-- 角色名称 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">角色名称：</p>
          <div class="w-60">
            <el-input v-model="filter.data.name" placeholder="请输入关键字" clearable />
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" class="w-24" @click="filter.search">筛选</el-button>
        <el-button type="primary" plain class="w-24" @click="filter.reset">清空</el-button>
        <el-button type="primary" class="w-24" @click="filter.add">添加</el-button>
      </div>
    </section>
    <!-- 表单 -->
    <section class="grow bg-white p-4 rounded overflow-hidden">
      <base-pagination
        v-model:currentPage="params.currentPage"
        v-model:page-size="params.size"
        :total="table.total"
        @current-change="table.getList"
        @size-change="table.getList(false)"
      >
        <div
          ref="tableRef"
          v-loading="table.loading"
          class="h-full"
        >
          <el-table
            :data="table.list" 
            border 
            :height="table.height"
          >
            <el-table-column label="序号" align="center" width="80" fixed>
              <template #default="scope">
                <span>{{ (params.currentPage - 1) * params.size + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="角色名称" min-width="200" align="center" />
            <el-table-column prop="createbyperson" label="描述" min-width="350" align="center" />
            <el-table-column prop="num" label="账号数量" min-width="120" align="center" />
            <el-table-column prop="inserttime" label="创建时间" min-width="180" align="center" />
            <el-table-column label="操作" align="center" min-width="180" fixed="right">
              <template #default="scope">
                <el-button 
                  type="primary"
                  link 
                  @click="$router.push(`system-permission-role/edit/${scope.row.id}`)"
                >
                  编辑
                </el-button>
                <el-button 
                  type="primary"
                  link 
                  @click="removeRole(scope.row.id, scope.row.num)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </base-pagination>
    </section>
  </main>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { debounce, pickBy, throttle } from 'lodash-es'
import { useElementSize } from '@vueuse/core'
import BasePagination from '@/components/Base/BasePagination.vue'

defineOptions({
  name: 'SystemPermissionRole'
})

const router = useRouter()

onMounted(() => {
  table.getList(false)        // 获取表单
})

interface ParamsInter {
  currentPage: number
  size: number
  name: string
}

interface FilterDataInter {
  name: string
}

interface FilterInter {
  data: FilterDataInter
  reset: () => void
  search: () => void
  add: () => void
}

interface TableInter {
  loading: boolean
  list: any[]
  total: number
  height: number
  getList: (bool: boolean) => Promise<any>
}

/** section1 筛选区 **/
// 筛选
const filter:FilterInter = reactive({
  data: {
    name: ''
  },
  // 重置函数
  reset: () => {
    filter.data.name = params.name = ''
    table.getList(false)
  },
  // 搜索函数
  search: () => {
    params.name = filter.data.name
    table.getList(false)
  },
  // 新增角色
  add: () => {
    router.push({
      path: '/system-permission-role/add',
    })
  }
})

/** section2 表单区 **/
const tableRef = ref<HTMLElement | null>(null)
const params:ParamsInter = reactive({
  currentPage: 1,
  size: 15,
  name: '',
})
const table:TableInter = reactive({
  loading: true,
  list: [],
  total: 0,
  height: useElementSize(tableRef).height,
  getList: debounce((more = true) => {
    table.loading = true
    if (!more) params.currentPage = 1
    api.get('/system/role/getAdminRolePage', pickBy(params, (value: any, key: any) => {
      if (value === 0) return true
      return Boolean(value)
    })).then((res) => {
      if (res.code === 200) {
        table.total = res.data.total
        table.list = res.data.records || []
      } else {
        table.total = 0
        table.list = []
      }
      nextTick(() => table.loading = false)
    })
  }, 200, { leading: true, trailing: true }),
})

// 删除角色
const removeRole = throttle((id: number, num: number):void => {
  api.get('/system/role/deleteAdminRoleBefore', { id }).then((res) => {
    if (res.code === 200) {
      ElMessageBox.confirm('删除后不可恢复，请谨慎操作。', '是否确定删除该角色？', { type: 'warning' }).then(() => {
        api.get('/system/role/deleteAdminRole', { id }).then((res) => {
          if (res.code === 200) {
            ElMessage.success('删除成功')
            table.getList(true)
          }
        })
      }).catch(() => {})
    }
  })
}, 500, {
  leading: true,  
  trailing: false  
})
</script>