<template>
  <main class="h-full space-y-4 flex flex-col">
    <!-- 筛选区 -->
    <section class="shrink-0 bg-white rounded p-4">
      <div class="flex flex-wrap">
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">发送日期：</p>
          <el-date-picker
            v-model="filter.data.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            clearable
          />
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
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">医院：</p>
          <div class="w-60">
            <el-select v-model="filter.data.hosid" clearable>
            <el-option
              v-for="item in hospitalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">科室：</p>
          <div class="w-60">
            <el-select v-model="filter.data.depid" clearable>
            <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <!-- 医生 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">医生：</p>
          <div class="w-60">
            <el-input v-model="filter.data.docname" placeholder="请输入关键字" clearable />
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" class="w-24" @click="filter.search">筛选</el-button>
        <el-button type="primary" plain class="w-24" @click="filter.reset">清空</el-button>
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
            <el-table-column prop="id" label="编号" width="200" align="center" />
            <el-table-column prop="createdTime" label="发送日期" width="200" align="center" />
            <el-table-column prop="hospitalName" label="医院" min-width="200" align="center" />
            <el-table-column prop="departmentName" label="科室" min-width="150" align="center" />
            <el-table-column prop="doctorName" label="医生" min-width="120" align="center" />
            <el-table-column prop="patientName" label="患者" min-width="120" align="center" />
            <el-table-column label="状态" min-width="120" align="center">
              <template #default="scope">
                <span>{{ scope.row.isBlocked ? '未解锁' : '已解锁' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="支付金额（人民币）" min-width="150" align="center" />
            <el-table-column label="操作" align="center" min-width="150" fixed="right">
              <template #default="scope">
                <el-button 
                  type="primary"
                  link 
                  @click="$router.push(`medical-guide-details/detail/${scope.row.id}`)"
                >
                  查看详情
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
  depid: number | undefined
  hosid: number | undefined
  docname: string
  starttime: string
  endtime: string
  state: number| undefined
}

interface FilterDataInter {
  time: undefined
  state: number| undefined
  hosid: number| undefined
  depid: number| undefined
  docname: string
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
  { label: '已解锁', value: 0 },
  { label: '未解锁', value: 1 }
]
// 医院列表、科室列表
const hospitalOptions = ref<OptionInter[] | null>(null)
const departmentOptions = ref<OptionInter[] | null>(null)
// 筛选
const filter:FilterInter = reactive({
  data: {
    time: undefined,
    state: -1,
    hosid: undefined,
    depid: undefined,
    docname: ''
  },
  // 重置函数，将所有 filter.data 和 params 的属性重置为默认值，并调用 table.getList(false) 方法  
  reset: () => {
    filter.data.time = filter.data.hosid = filter.data.depid = params.depid = params.hosid = undefined
    filter.data.state = params.state = -1
    filter.data.docname = params.docname = params.starttime = params.endtime = ''
    table.getList(false)
  },
  // 搜索函数，将 filter.data 中的属性值赋给 params，并根据 filter.data.time 的值设置 params.starttime 和 params.endtime，然后调用 table.getList(false) 方法
  search: () => {
    params.depid = filter.data.depid
    params.hosid = filter.data.hosid
    params.docname = filter.data.docname
    params.state = filter.data.state
    params.starttime = filter.data.time ? filter.data.time[0] : ''
    params.endtime = filter.data.time ? filter.data.time[1] : ''
    table.getList(false)
  }
})

/** section2 表单区 **/
const tableRef = ref<HTMLElement | null>(null)
const params:ParamsInter = reactive({
  currentPage: 1,
  size: 15,
  depid: undefined,
  hosid: undefined,
  docname: '',
  starttime: '',
  endtime: '',
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
    api.get('/datacenter/report/getReportPage', pickBy(params, (value: any, key: any) => {
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

// 获取医院列表 和 科室列表
try {
  const [departmentRes, hospitalRes] = await Promise.all([
    api.get('/datacenter/report/getDepartmentList2'),
    api.get('/datacenter/report/getHospitalList')
  ])
  if (departmentRes.code === 200) departmentOptions.value = departmentRes.data
  if (hospitalRes.code === 200) hospitalOptions.value = hospitalRes.data
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>