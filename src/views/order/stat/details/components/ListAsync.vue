<template>
  <main class="h-full space-y-4 flex flex-col">
    <!-- 筛选区 -->
    <section class="shrink-0 bg-white rounded p-4">
      <div class="flex flex-wrap">
        <!-- 交易平台 -->
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
        <!-- 订单编号 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">订单编号：</p>
          <div class="w-60">
            <el-input v-model="filter.data.ordernum" placeholder="请输入订单编号" clearable />
          </div>
        </div>
        <!-- 商品名称 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">商品名称：</p>
          <div class="w-60">
            <el-input v-model="filter.data.proname" placeholder="请输入商品名称" clearable />
          </div>
        </div>
        <!-- 下单时间 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">下单时间：</p>
          <el-date-picker
            v-model="filter.data.xiadanTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            clearable
          />
        </div>
        <!-- 发货时间 -->
        <div class="mr-10 mb-4 f-c-c space-x-2">
          <p class="shrink-0 text-sm">发货时间：</p>
          <el-date-picker
            v-model="filter.data.fahuoTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            clearable
          />
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
          <el-tabs
            v-model="params.state"
            type="card"
            class="demo-tabs"
            @tab-change="table.getList(false)"
          >
            <el-tab-pane 
              v-for="(item, index) in tabs" 
              :key="index"
              :label="item.label" 
              :name="item.value"
            />
          </el-tabs>
          <el-scrollbar :height="table.height - 50" class="-mt-4">
            <table class="w-full table-auto border-collapse text-sm border">
              <thead class="sticky top-0 z-50">
                <tr>
                  <th class="w-[29%]">商品信息</th>
                  <th class="w-[29%]">用户 / 收货人/</th>
                  <th class="w-[14%]">支付金额（港币）</th>
                  <th class="w-[14%]">订单状态</th>
                  <th class="w-[14%]">操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="isNonEmptyArray(table.list)">
                  <template
                    v-for="(item, index) in table.list"
                    :key="index" 
                  >
                    <tr>
                      <td colspan="5">
                        <div class="h-9 bg-gray-100 rounded-t mt-4 f-c px-4 space-x-8 text-left border">
                          <p class="min-w-64">下单时间：{{ item.inserttime }}</p>
                          <p class="min-w-64">订单编号：{{ item.ordernum }}</p>
                          <p class="min-w-64">交易平台：{{ item.platform }}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <!-- 商品信息 -->
                      <td>
                        <div class="text-left px-4">
                          <div 
                            v-if="isNonEmptyArray(JSON.parse(item.proinfo))" 
                            class="p-4 space-y-4"
                          >
                            <div
                              v-for="(proData, idx) in JSON.parse(item.proinfo)"
                              :key="idx"
                              class="flex space-x-3"
                            >
                              <div class="shrink-0 w-28 h-28 rounded shadow">
                                <img 
                                  :src="proData.pic" 
                                  :alt="proData.name" 
                                  width="112" 
                                  height="112" 
                                  class="rounded w-28 h-28 object-cover object-center"
                                >
                              </div>
                              <div class="grow space-y-1">
                                <div class="h-11 flex justify-between space-x-4">
                                  <p class="line-2 text-gray-600 h-10">{{ proData.name }}</p>
                                  <p class="shrink-0">￥ {{ proData.price }}</p>
                                </div>
                                <div class="flex justify-between space-x-4">
                                  <p class="text-xs text-gray-500 h-8 line-2">规格：{{ proData.guige }}</p>
                                  <p class="shrink-0">x{{ proData.num }}</p>
                                </div>
                                <div class="text-sm text-gray-600">{{ proData.prostate }}</div>
                                <div class="text-xs text-gray-600 cursor-pointer">{{ proData.salestate }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- 用户 -->
                      <td class="relative">
                        <div class="p-4 space-y-1 text-gray-600 text-left absolute top-0">
                          <!-- <p>
                            <span>下单用户：</span>
                            <button 
                              class="text-primary"
                              @click="$router.push(`/user/manage/detail/${item.userid}`)"
                            >
                              {{ JSON.parse(item.userinfo).name }}
                            </button>
                          </p> -->
                          <p>下单用户：{{ JSON.parse(item.userinfo).name }}</p>
                          <p>收货人：{{ JSON.parse(item.userinfo).shouhuoname }}  {{ JSON.parse(item.userinfo).mobile }}</p>
                          <p>收货地址：{{ JSON.parse(item.userinfo).address }}</p>
                        </div>
                      </td>
                      <!-- 支付金额 -->
                      <td class="relative">
                        <div class="absolute top-8 inset-x-0">{{ item.moneyhk }}</div>
                      </td>
                      <!-- 订单状态 -->
                      <td class="relative">
                        <div class="absolute top-8 inset-x-0">{{ item.statetext }}</div>
                      </td>
                      <!-- 操作 -->
                      <td class="relative">
                        <div class="absolute top-8 inset-x-0">
                          <el-button link type="primary" @click="$router.push(`/order-stat-details/detail/${item.id}`)">查看详情</el-button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">
                      <div class="w-full f-c-c text-t1" :style="{ height: `${table.height - 100}px` }">
                        暂无数据
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </el-scrollbar>
        </div>
      </base-pagination>
    </section>
  </main>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { debounce, pickBy } from 'lodash-es'
import { useElementSize } from '@vueuse/core'
import { isNonEmptyArray } from '@/until/array'
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
  ordernum: string
  proname: string
  xiadanstarttime: string
  xiadanendtime: string
  fahuostarttime: string
  fahuoendtime: string,
  state: number | undefined
}

interface FilterDataInter {
  xiadanTime: undefined
  fahuoTime: undefined
  platform: number| undefined
  ordernum: string
  proname: string
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
// 平台列表
const platformOptions = ref<OptionInter[]>([
  { label: '九州网', value: 2 },
  { label: '木子网', value: 1 },
])
// 筛选
const filter:FilterInter = reactive({
  data: {
    xiadanTime: undefined,
    fahuoTime: undefined,
    platform: undefined,
    ordernum: '',
    proname: ''
  },
  // 重置函数
  reset: () => {
    filter.data.fahuoTime = filter.data.xiadanTime = filter.data.platform = params.platform = undefined
    filter.data.ordernum = params.ordernum = filter.data.proname = params.proname = ''
    params.xiadanstarttime = params.xiadanendtime = params.fahuostarttime = params.fahuoendtime = ''
    getCount(0)
    table.getList(false)
  },
  // 搜索函数
  search: () => {
    params.platform = filter.data.platform
    params.ordernum = filter.data.ordernum
    params.proname = filter.data.proname
    params.xiadanstarttime = filter.data.xiadanTime ? filter.data.xiadanTime[0] : ''
    params.xiadanendtime = filter.data.xiadanTime ? filter.data.xiadanTime[1] : ''
    params.fahuostarttime = filter.data.fahuoTime ? filter.data.fahuoTime[0] : ''
    params.fahuoendtime = filter.data.fahuoTime ? filter.data.fahuoTime[1] : ''
    getCount(params.platform as number)
    table.getList(false)
  }
})

/** section2 表单区 **/
const getCount = (platform: number):void => {
  api.get('/order/getOrderCount', {platform}).then((res) => {
    if (res.code === 200) count.value = res.data
  })
}
const count = ref<number>(0)
const tabs = ref<OptionInter[]>([
  { label: '全部', value: 0 },
  { label: '待发货', value: 2 },
  { label: '已发货', value: 3 },
  { label: '已完成', value: 4 }
])
watchEffect(() => {
  tabs.value[1].label = `待发货(${count.value})`
})
const tableRef = ref<HTMLElement | null>(null)
const params:ParamsInter = reactive({
  currentPage: 1,
  size: 15,
  platform: undefined,
  ordernum: '',
  proname: '',
  xiadanstarttime: '',
  xiadanendtime: '',
  fahuostarttime: '',
  fahuoendtime: '',
  state: 0,
})
const table:TableInter = reactive({
  loading: true,
  list: [],
  total: 0,
  height: useElementSize(tableRef).height,
  getList: debounce((more = true) => {
    table.loading = true
    if (!more) params.currentPage = 1
    api.get('/order/getOrderPage', pickBy(params, (value: any, key: any) => {
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

// 获取数量
try {
  const [countRes] = await Promise.all([
    api.get('/order/getOrderCount')
  ])
  if (countRes.code === 200) count.value = countRes.data
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>


<style scoped>
th {
  @apply border h-10 bg-gray-100
}
td {
  @apply text-t2 text-center border
}
.el-tabs__header {
  margin: 0 0 0px
}
</style>