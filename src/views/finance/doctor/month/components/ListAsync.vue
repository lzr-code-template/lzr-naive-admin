<template>
  <main class="h-full space-y-4 flex flex-col">
    <!-- 筛选区 -->
    <section class="shrink-0 bg-white rounded p-4">
      <div class="flex flex-wrap">
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">时间：</p>
          <el-date-picker
            v-model="filter.data.time"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM"
            clearable
          />
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
        <!-- 医生 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">医生：</p>
          <div class="w-60">
            <el-input v-model="filter.data.doctorname" placeholder="请输入关键字" clearable />
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
            <el-table-column prop="reportDate" label="日期" width="180" align="center" />
            <el-table-column prop="hosname" label="医院" min-width="250" align="center" />
            <el-table-column prop="depname" label="科室" min-width="180" align="center" />
            <el-table-column prop="name" label="医生" min-width="130" align="center" />
            <el-table-column prop="newReportNum" label="新增指南" min-width="130" align="center" />
            <el-table-column prop="unLockedNum" label="解锁指南" min-width="130" align="center" />
            <el-table-column prop="totalPrice" label="指南收入（人民币）" min-width="130" align="center" />
            <el-table-column prop="ordercount" label="订单数" min-width="130" align="center" />
            <el-table-column prop="orderprofit" label="订单分润（港币）" min-width="180" align="center" />
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
  hosid: number | undefined
  doctorname: string
  starttime: string
  endtime: string
}

interface FilterDataInter {
  time: undefined
  hosid: number| undefined
  doctorname: string
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
// 医院列表
const hospitalOptions = ref<OptionInter[] | null>(null)
// 筛选
const filter:FilterInter = reactive({
  data: {
    time: undefined,
    hosid: undefined,
    doctorname: ''
  },
  // 重置函数，将所有 filter.data 和 params 的属性重置为默认值，并调用 table.getList(false) 方法  
  reset: () => {
    filter.data.time = filter.data.hosid = params.hosid = undefined
    filter.data.doctorname = params.doctorname = params.starttime = params.endtime = ''
    table.getList(false)
  },
  // 搜索函数，将 filter.data 中的属性值赋给 params，并根据 filter.data.time 的值设置 params.starttime 和 params.endtime，然后调用 table.getList(false) 方法
  search: () => {
    params.hosid = filter.data.hosid
    params.doctorname = filter.data.doctorname
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
  hosid: undefined,
  doctorname: '',
  starttime: '',
  endtime: ''
})
const table:TableInter = reactive({
  loading: true,
  list: [],
  total: 0,
  height: useElementSize(tableRef).height,
  getList: debounce((more = true) => {
    table.loading = true
    if (!more) params.currentPage = 1
    api.get('/finance/doctor/doctorMonthlySalary', pickBy(params, (value: any, key: any) => {
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
  const [hospitalRes] = await Promise.all([
    api.get('/datacenter/report/getHospitalList')
  ])
  if (hospitalRes.code === 200) hospitalOptions.value = hospitalRes.data
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>