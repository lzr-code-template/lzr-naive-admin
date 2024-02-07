<template>
  <main class="space-y-4 flex flex-col">
    <!-- 订单状态、步骤条 -->
    <section class="shrink-0 h-56 bg-white rounded p-4">
      <div class="h-full border flex">
        <div class="w-2/5 border-r p-4">
          <!-- 待发货 -->
          <template v-if="orderData.state === 2">
            <div class="space-y-4">
              <p class="text-xl font-bold">待发货</p>
            </div>
          </template>
          <!-- 已发货 -->
          <template v-if="orderData.state === 3">
            <div class="space-y-6">
              <p class="text-xl font-bold">已发货，等待用户确认</p>
            </div>
          </template>
          <!-- 已完成 -->
          <template v-if="orderData.state === 4">
            <div class="space-y-4">
              <p class="text-xl font-bold">已完成</p>
            </div>
          </template>
        </div>
        <div class="w-3/5 p-16">
          <el-steps 
            v-if="[1, 2, 3, 4, 5].includes(orderData.state as number)"
            :active="stepsActive"
          >
            <el-step title="提交订单" :description="orderData.inserttime" />
            <el-step title="订单付款" :description="orderData.paytime" />
            <el-step title="订单发货" :description="orderData.fahuotime" />
            <el-step title="确认收货" :description="orderData.shouhuotime" />
          </el-steps>
        </div>
      </div>
    </section>
    <!-- 包裹信息 -->
    <section 
      v-if="orderData.state as number > 2"
      class="shrink-0 h-80 bg-white rounded flex"  
    >
      <el-scrollbar class="w-1/2 h-full border-r p-4">
        <div class="flex space-x-4">
          <div class="shrink-0 min-w-52 text-sm leading-6">
            <p>快递单号：xxxxxx</p>
            <p>快递公司：xxxxxx</p>
            <p>发货时间：xxxxxx</p>
          </div>
          <div class="grow space-y-2.5">
            <p class="font-bold text-t2">商品</p>
            <div 
              v-if="isNonEmptyArray(JSON.parse(orderData.proinfo))"
              class="space-y-2.5"  
            >
              <div 
                v-for="(item, index) in JSON.parse(orderData.proinfo)" 
                :key="index"
                class="flex items-center space-x-2"
              >
                <div class="shrink-0 w-16 h-16 rounded border">
                  <img :src="item.pic" :alt="item.name" width="64" height="64">
                </div>
                <div class="grow space-y-1.5 text-sm">
                  <p class="line-1">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">规格：{{ item.guige }}</p>
                  <p class="text-xs">数量：{{ item.num }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <el-scrollbar class="w-1/2 h-full p-4">
        快递信息
      </el-scrollbar>
    </section>
    <!-- 收货人信息、订单信息 -->
    <section class="shrink-0 bg-white rounded">
      <table class="w-full table-auto border-collapse border text-sm">
        <thead>
          <tr>
            <th class="w-1/2">收货人信息</th>
            <th class="w-1/2">订单信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="relative h-40">
              <div class="absolute top-4 left-4 space-y-1.5 text-left">
                <p>收货人：{{ JSON.parse(orderData.userinfo).shouhuoname }}</p>
                <p>联系电话：{{ JSON.parse(orderData.userinfo).mobile }}</p>
                <p>收货地址：{{ JSON.parse(orderData.userinfo).address }}</p>
              </div>
            </td>
            <td class="relative h-40">
              <div class="absolute top-4 left-4 space-y-1.5 text-left">
                <p>订单编号：{{ orderData.ordernum }}</p>
                <p>下单用户：{{ JSON.parse(orderData.userinfo).name }}</p>
                <p>下单时间：{{ orderData.inserttime }}</p>
                <p>支付时间：{{ orderData.paytime }}</p>
                <p>支付方式：{{ orderData.payway }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- 商品信息 -->
    <section 
      v-if="isNonEmptyArray(JSON.parse(orderData.proinfo))" 
      class="shrink-0 bg-white rounded"
    >
      <table class="w-full table-auto border-collapse border text-sm">
        <thead>
          <tr>
            <th class="w-[40%]">商品信息</th>
            <th class="w-[20%]">单价(港币)</th>
            <th class="w-[20%]">数量</th>
            <th class="w-[20%]">发货状态</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>
              <div 
                v-if="isNonEmptyArray(JSON.parse(orderData.proinfo))"
                class="space-y-2.5 p-4 flex flex-col items-start justify-start text-left"  
              >
                <div 
                  v-for="(item, index) in JSON.parse(orderData.proinfo)" 
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <div class="shrink-0 w-16 h-16 rounded border">
                    <img :src="item.pic" :alt="item.name" width="64" height="64">
                  </div>
                  <div class="grow space-y-1.5 text-sm">
                    <p class="line-1">{{ item.name }}</p>
                    <p class="text-xs text-gray-500">规格：{{ item.guige }}</p>
                    <p class="text-xs">数量：{{ item.num }}</p>
                  </div>
                </div>
              </div>
            </td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr> -->
          <tr
            v-for="(item, index) in JSON.parse(orderData.proinfo)" 
            :key="index"
          >
            <td class="space-y-2.5 p-4 flex flex-col items-start justify-start">
              <div class="flex items-center space-x-2">
                <div class="shrink-0 w-16 h-16 rounded border">
                  <img :src="item.pic" :alt="item.name" width="64" height="64">
                </div>
                <div class="grow space-y-1.5 text-sm text-left">
                  <p class="line-1">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">规格：{{ item.guige }}</p>
                  <p class="text-xs">数量：{{ item.num }}</p>
                </div>
              </div>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.num }}</td>
            <td>{{ orderData.state }}</td>
          </tr>
        </tbody>
      </table>
      <div class="py-10 flex justify-end">
        <div class="space-y-4">
          <div class="flex space-x-2 text-sm">
            <p class="w-32">商品总价：</p>
            <p class="px-4">{{ orderData.totalmoneyhk }} 港币</p>
          </div>
          <div class="flex space-x-2 text-lg">
            <p class="w-32 font-bold">支付金额：</p>
            <p class="text-error px-4">{{ orderData.moneyhk }} 港币</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script setup lang="ts">
import api from '@/api/index'
import type { OrderInter } from '@/types/order.ts'
import { isNonEmptyArray } from '@/until/array'

const route = useRoute()
const stepsActive = ref<number | undefined>(undefined)
const orderData = ref<OrderInter>({
  discountmoneyhk: undefined,
  fahuotime: '',
  id: undefined,
  inserttime: '',
  moneyhk: undefined,
  moneyrmb: undefined,
  ordernum: '',
  paytime: '',
  payway: '',
  platform: '',
  proinfo: '',
  state: undefined,
  statetext: '',
  totalmoneyhk: undefined,
  totalmoneyrmb: undefined,
  userinfo: '',
  shouhuotime: ''
})

// 获取详情
try {
  const [detailRes] = await Promise.all([
    api.get('/order/getOrderDetail', { id: route.params.id })
  ])
  if (detailRes.code === 200) {
    Object.assign(orderData.value, detailRes.data)
    stepsActive.value = [0, 1, 2, 2, 3, 4][detailRes.data.state]
  }
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>

<style scoped>
th {
  @apply border h-10 bg-gray-100
}
td {
  @apply border text-t2 text-center
}
</style>