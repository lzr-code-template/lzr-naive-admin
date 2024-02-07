<template>
  <main class="h-full space-y-4 flex flex-col">
    <!-- 筛选区 -->
    <section class="shrink-0 bg-white rounded p-4">
      <div class="flex flex-wrap">
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">关键字：</p>
          <div class="w-60">
            <el-input v-model="filter.data.name" placeholder="请输入关键字" clearable />
          </div>
        </div>
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">账号角色：</p>
          <div class="w-60">
            <el-select v-model="filter.data.roleid" clearable>
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">指南状态：</p>
          <div class="w-60">
            <el-select v-model="filter.data.state" placeholder="全部">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" class="w-24" @click="filter.search">筛选</el-button>
        <el-button type="primary" plain class="w-24" @click="filter.reset">清空</el-button>
        <el-button type="primary" class="w-24" @click="$router.push('/system-permission-account/add')">添加</el-button>
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
            <el-table-column prop="mobile" label="手机号" min-width="120" align="center" />
            <el-table-column prop="name" label="姓名" min-width="120" align="center" />
            <el-table-column label="角色" min-width="170" align="center">
              <template #default="scope">
                {{ JSON.parse(scope.row.roleName).join('、') }}
              </template>
            </el-table-column>
            <el-table-column prop="inserttime" label="创建时间" min-width="200" align="center" />
            <el-table-column label="状态" min-width="80" align="center">
              <template #default="scope">
                <span>{{ ['停用', '启用'][scope.row.state] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150" fixed="right">
              <template #default="scope">
                <el-button 
                  type="primary"
                  link 
                  @click="$router.push(`system-permission-account/edit/${scope.row.id}`)"
                >
                  编辑
                </el-button>
                <el-button 
                  type="primary"
                  link 
                  @click="changeAccountStatus(scope.row.id, scope.row.state)"
                >
                  {{ ['启用', '停用'][scope.row.state] }}
                </el-button>
                <el-button 
                  type="primary"
                  link 
                  @click="removeAccount(scope.row.id)"
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
import { debounce, pickBy } from 'lodash-es'
import { useElementSize } from '@vueuse/core'
import BasePagination from '@/components/Base/BasePagination.vue'


onMounted(() => {
  table.getList(false)        // 获取表单
})

interface OptionInter {
  label: string
  value: number
}
interface ParamsInter {
  currentPage: number
  size: number
  roleid: number | undefined
  name: string
  state: number| undefined
}

interface FilterDataInter {
  state: number| undefined
  roleid: number| undefined
  name: string
}

interface FilterInter {
  data: FilterDataInter
  reset: () => void
  search: () => void
}

interface TableInter {
  loading: boolean
  list: any[]
  total: number
  height: number
  getList: (bool: boolean) => Promise<any>
}

/** section1 筛选区 **/
// 状态列表
const stateOptions: OptionInter[] = [
  { label: '全部', value: -1 },
  { label: '启用', value: 1 },
  { label: '停用', value: 0 }
]
// 账号角色列表、科室列表
const roleOptions = ref<OptionInter[] | null>(null)
// 筛选
const filter:FilterInter = reactive({
  data: {
    state: -1,
    roleid: undefined,
    name: ''
  },
  // 重置函数
  reset: () => {
    filter.data.roleid = params.roleid = undefined
    filter.data.state = params.state = -1
    filter.data.name = params.name = ''
    table.getList(false)
  },
  // 搜索函数
  search: () => {
    params.roleid = filter.data.roleid
    params.name = filter.data.name
    params.state = filter.data.state
    table.getList(false)
  }
})

/** section2 表单区 **/
const tableRef = ref<HTMLElement | null>(null)
const params:ParamsInter = reactive({
  currentPage: 1,
  size: 15,
  roleid: undefined,
  name: '',
  state: -1
})
const table:TableInter = reactive({
  loading: true,
  list: [],
  total: 0,
  height: useElementSize(tableRef).height,
  getList: debounce((more = true) => {
    table.loading = true
    if (!more) params.currentPage = 1
    api.get('/system/account/getAdminUserPage', pickBy(params, (value: any, key: any) => {
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

// 停用、启用 账号
const changeAccountStatus = (id: number, state: number): void => {
  ElMessageBox.confirm(
    `${['启用后该账号可恢复所有功能。', '停用后该账号将无法登录。'][state]}`, 
    `${['是否确定启用？', '是否确定停用?'][state]}`, 
    { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    api.get('/system/account/onoffAdmin', { id }).then((res) => {
      if(res.code === 200) {
        ElMessage({ message: res.msg, type: 'success'})
        table.getList(true)
      }
    })
  }).catch(() => {})
}
// 删除账号
const removeAccount = (id: number): void => {
  ElMessageBox.confirm(
    '该操作无法撤销，请谨慎操作。',
    '是否确定删除该账号？',
    { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    api.get('/system/account/deleteAdmin', { id }).then((res) => {
      if(res.code === 200) {
        ElMessage({ message: res.msg, type: 'success'})
        table.getList(true)
      }
    })
  }).catch(() => {})
}

// 获取账号角色列表 和 科室列表
try {
  const [roleRes] = await Promise.all([
    api.get('/system/account/getRoleList')
  ])
  if (roleRes.code === 200) {
    roleOptions.value = roleRes.data.map((item: { name: string; id: number }) => ({
      label: item.name,
      value: item.id
    }))
  }
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>