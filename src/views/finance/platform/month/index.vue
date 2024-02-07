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
          <p class="shrink-0 text-sm">交易平台：</p>
          <div class="w-60">
            <el-select v-model="filter.data.platform" clearable>
              <el-option
                v-for="item in platformOptions"
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
            <el-table-column prop="inserttime" label="日期" width="180" align="center" />
            <el-table-column prop="platform" label="平台" min-width="250" align="center" />
            <el-table-column prop="ordercount" label="订单数" min-width="120" align="center" />
            <el-table-column prop="price" label="订单金额（港币）" min-width="120" align="center" />
            <el-table-column prop="cost" label="商品成本（港币）" min-width="120" align="center" />
            <el-table-column prop="profit" label="分润成本（港币）" min-width="120" align="center" />
            <el-table-column prop="gross" label="毛利（港币）" min-width="120" align="center" />
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
  platform: number | undefined
  xiadanstarttime: string
  xiadanendtime: string
}

interface FilterDataInter {
  time: undefined
  platform: number| undefined
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
const platformOptions = ref<OptionInter[]>([
  { label: '九州网', value: 2 },
  { label: '木子网', value: 1 },
])
// 筛选
const filter:FilterInter = reactive({
  data: {
    time: undefined,
    platform: undefined,
  },
  // 重置函数，将所有 filter.data 和 params 的属性重置为默认值，并调用 table.getList(false) 方法  
  reset: () => {
    filter.data.time = filter.data.platform = params.platform = undefined
    params.xiadanstarttime = params.xiadanendtime = ''
    table.getList(false)
  },
  // 搜索函数，将 filter.data 中的属性值赋给 params，并根据 filter.data.time 的值设置 params.xiadanstarttime 和 params.xiadanendtime，然后调用 table.getList(false) 方法
  search: () => {
    params.platform = filter.data.platform
    params.xiadanstarttime = filter.data.time ? filter.data.time[0] : ''
    params.xiadanendtime = filter.data.time ? filter.data.time[1] : ''
    table.getList(false)
  }
})

/** section2 表单区 **/
const tableRef = ref<HTMLElement | null>(null)
const params:ParamsInter = reactive({
  currentPage: 1,
  size: 15,
  platform: undefined,
  xiadanstarttime: '',
  xiadanendtime: ''
})
const table:TableInter = reactive({
  loading: true,
  list: [],
  total: 0,
  height: useElementSize(tableRef).height,
  getList: debounce((more = true) => {
    table.loading = true
    if (!more) params.currentPage = 1
    api.get('/finance/platform/getplatDaily', pickBy(params, (value: any, key: any) => {
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
</script>