<template>
  <div class="py-3">
    <div class="flex space-x-3">
      <div class="w-72 shrink-0">
        <n-card :title="stateData[6].title">
          <div class="space-y-8">
            <div class="space-y-3">
              <p>快递签收后，如用户未在签收后7天内确认收货，系统将自动确认</p>
              <p>用户留言：家里的马上就用完了，请在2天内发货，不然就要断药了</p>
            </div>
            <n-steps size="small" :current="7" status="process" vertical>
              <n-step
                v-for="(item, index) in stateData"
                :key="index"
                :title="item.state"
                :description="item.time"
              />
            </n-steps>
          </div>
        </n-card>
      </div>
      <div class="grow space-y-3">
        <n-card title="收货人信息">
          <n-table :single-line="false" striped>
            <tbody>
              <tr>
                <td class="w-32">收货人</td>
                <td>李梓瑞</td>
              </tr>
              <tr>
                <td>联系电话</td>
                <td>13322233332</td>
              </tr>
              <tr>
                <td>收货地址</td>
                <td>山东省威海市环翠区皇冠街道青岛中路时代嘉园C栋2单元1603</td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
        <n-card title="订单信息">
          <n-table :single-line="false" striped>
            <tbody>
              <tr>
                <td class="w-32">订单编号</td>
                <td>
                  <div class="space-x-3">
                    <span>456745674567456756</span>
                    <n-button text type="primary">复制</n-button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>下单用户</td>
                <td>
                  <n-button text type="info">小黑子</n-button>
                </td>
              </tr>
              <tr>
                <td>下单时间</td>
                <td>2022-08-19 08:45:45</td>
              </tr>
              <tr>
                <td>入库时间</td>
                <td>2022-08-19 08:45:45</td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stateData = ref([
  { state: '提交订单', time: '2022-08-19 08:18:57', title: '订单已提交，等待用户付款' }, // 1、提交订单 等待用户支付
  { state: '订单付款', time: '2022-08-19 08:18:57', title: '待入库' }, // 2、用户完成支付，等待（后台）处理商品入库
  { state: '待提交（打包信息）', time: '2022-08-19 08:18:57', title: '商品已入库，等待用户提交打包信息' }, // 3、已入库，等待用户确认收货地址、打包方式等……
  { state: '已提交（打包信息）', time: '2022-08-19 08:18:57', title: '处理打包' }, // 4、后台处理打包
  { state: '待支付（打包费）', time: '2022-08-19 08:18:57', title: '已完成打包，等待用户支付剩余费用' }, // 5、已打包，等待用户支付剩余费用（保险费、仓储费、增值服务、日本运费、国际运费……）
  { state: '已支付（打包费）', time: '2022-08-19 08:18:57', title: '待发货' }, // 6、已发货，等待用户确认收货
  { state: '订单发货', time: '2022-08-19 08:18:57', title: '已发货，等待用户确认' }, // 7、已发货，等待用户确认收货
  { state: '确认收货', time: '2022-08-19 08:18:57', title: '已完成' }, // 8、交易已成功，如果用户提出售后要求，请积极与用户协商，做好售后服务。
])
</script>

<style scoped>

</style>
