<template>
  <el-scrollbar ref="scrollbarRef" class="bg-white rounded">
    <main class="space-y-10 p-6 relative">
      <!-- 付费信息 -->
      <section class="space-y-3">
        <h2 class="text-lg font-bold">付费信息</h2>
        <div class="space-y-4">
          <p class="text-sm font-bold text-right">状态：{{ report.info.stateName }}</p>
          <table class="w-full table-auto border-collapse border text-sm">
            <thead>
              <tr>
                <th>
                  <p class="px-10 text-gray-500">支付单号</p>
                </th>
                <th>
                  <p class="px-10 text-gray-500">付款时间</p>
                </th>
                <th>
                  <p class="px-10 text-gray-500">支付方式</p>
                </th>
                <th>
                  <p class="px-10 text-gray-500">支付金额</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p class="px-10 leading-10">{{ report.info.payNum }}</p>
                </td>
                <td>
                  <p class="px-10 leading-10">{{ report.info.payTime }}</p>
                </td>
                <td>
                  <p class="px-10 leading-10">{{ report.info.payWay }}</p>
                </td>
                <td>
                  <p class="px-10 leading-10">
                    <span v-if="report.info.payPrice !== '/'">¥</span>
                    <span>{{ report.info.payPrice }}</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- 报告信息 -->
      <section class="space-y-6">
        <h2 class="text-lg font-bold">报告信息</h2>
        <div class="space-y-6">
          <h3 class="text-center text-lg font-semibold">国际前沿医疗方向动态报告</h3>
          <div class="w-full h-[282px] bg-gradient-to-r from-[#44B5C4] to-[#55D0C7] rounded-lg px-10 pt-6 pb-8 text-white relative">
            <div class="absolute inset-y-0 right-0 w-[542px] bg-report rounded-r-lg" />
            <div class="relative space-y-10">
              <div class="space-y-4">
                <div class="flex">
                  <p class="text-4xl font-semibold">{{ report.info.name }}（{{ report.info.gender }}）</p>
                  <p class="ml-auto mt-1.5 text-sm">编号：{{ report.info.numId }}</p>
                </div>
                <div class="space-y-2">
                  <div class="flex space-x-12">
                    <p class="w-72">
                      <span class="text-align-justify">年龄</span>
                      <span>：{{ report.info.age }}周岁</span>
                    </p>
                    <p class="w-72">
                      <span class="text-align-justify">日期</span>
                      <span>：{{ report.info.dateStr }}</span>
                    </p>
                  </div>
                  <div class="flex space-x-12">
                    <p class="w-72">
                      <span class="text-align-justify">检测机构</span>
                      <span>：{{ report.info.hospitalName }}</span>
                    </p>
                    <p class="w-72">
                      <span class="text-align-justify">检查医生</span>
                      <span>：{{ report.info.doctorName }} {{ report.info.departmentName }} {{ report.info.jobName }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <p class="text-4xl font-semibold">{{ report.info.diseaseName }}</p>
                <div class="space-y-2">
                  <div class="flex space-x-12">
                    <p class="w-72">
                      <span class="text-align-justify">英文</span>
                      <span>：{{ report.info.diseaseEngName }}</span>
                    </p>
                    <p class="w-72">
                      <span class="text-align-justify justify-between">所属科室</span>
                      <span>：{{ report.info.departmentName1 }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-alert title="声明：本报告仅作为国内外前沿医学知识科普使用，不能代替专业诊疗意见。" type="error" :closable="false" />
          <div id="tabsId">
            <div class="sticky top-0 bg-white z-10">
              <el-tabs v-model="tabs.active" @tab-click="tabs.change">
                <el-tab-pane 
                  v-for="item in tabs.list"
                  :key="item.name"
                  :label="item.tab" 
                  :name="item.name"
                />
              </el-tabs>
            </div>
            <div class="min-h-[85vh] px-4">
              <template v-if="tabs.active !== 'bottomGuoJiZhiLiao'">
                <div v-dompurify-html="report.info[tabs.active]" />
              </template>
              <template v-else>
                <div class="pt-2 pb-12 space-y-12">
                  <!-- 国际用药 -->
                  <div>
                    <h3 class="text-2xl font-semibold">国际用药</h3>
                    <div class="mt-5 f-c flex-wrap">
                      <div
                        v-for="(item, index) in JSON.parse(report.info.bottomGuoJiZhiLiao)"
                        :key="index"
                        class="mr-3 mb-3 rounded"
                      >
                        <el-button
                          secondary
                          :type="report.productActive === index ? 'primary' : 'default'"
                          @click="report.changeProcuct(index)"
                        >
                          {{ item.name }}
                        </el-button>
                      </div>
                    </div>
                    <!-- 药品信息 -->
                    <div class="mt-7 flex space-x-6 h-[36.25rem]">
                      <div class="shrink-0 w-[30rem] flex flex-col">
                        <div class="shrink-0 h-[30rem] border">
                          <el-image
                            :src="JSON.parse(report.info.bottomGuoJiZhiLiao)[report.productActive].pic.split(',')[report.productImgActive]"
                            alt="productImg"
                            width="480"
                            height="480"
                            class="w-full h-full"
                          />
                        </div>
                        <div class="grow border-x border-b f-c px-4 space-x-4">
                          <div 
                            v-for="(item, index) in JSON.parse(report.info.bottomGuoJiZhiLiao)[report.productActive].pic.split(',')" 
                            :key="index"
                            class="w-[4.75rem] h-[4.75rem] bg-gray-100 cursor-pointer ring-offset-2"
                            :class="report.productImgActive === index ? 'ring-primary/60 ring-2' : 'ring-gray-200 ring-1'"
                            @click="report.productImgActive = index"
                          >
                            <img :src="item" alt="productImg" width="80" height="80" class="w-full h-full">
                          </div>
                        </div>
                      </div>
                      <div class="grow bg-gray-50 f-c px-6 py-7 flex flex-col space-y-6 relative">
                        <div class="w-full h-[3.125rem] f-c bg-primary/10 px-4">
                          <h4 class="text-2xl text-primary font-semibold">{{ JSON.parse(report.info.bottomGuoJiZhiLiao)[report.productActive].name }}</h4>
                        </div>
                        <div class="h-[425px] overflow-y-scroll">
                          <div v-dompurify-html="JSON.parse(report.info.bottomGuoJiZhiLiao)[report.productActive].shuoming" />
                        </div>
                        <div class="absolute inset-x-0 -bottom-7 text-center">
                          <p class="text-xs text-gray-400">*药品信息源自第三方网站，本报告仅做展示使用</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 国际就医 -->
                  <div class="space-y-6">
                    <h3 class="text-2xl font-semibold">国际就医</h3>
                    <div class="space-y-7">
                      <div
                        v-for="(item, index) in JSON.parse(report.info.bottomGuoJiZhiLiaoHospital)"
                        :key="index"
                        class="f-s space-x-6"
                      >
                        <div class="shrink-0 w-[30rem] h-[30rem]">
                          <el-image
                            :src="item.pic"
                            :alt="item.name"
                            width="480"
                            height="480"
                          />
                        </div>
                        <div class="grow">
                          <el-scrollbar class="bg-gray-50 max-h-[480px]">
                            <div class="h-[30rem] p-6">
                              <h4 class="text-2xl font-semibold">{{ item.name }}</h4>
                              <div class="mt-2">
                                <el-tag :bordered="false" size="small">{{ item.keyword }}</el-tag>
                              </div>
                              <p class="mt-4 text-base text-gray-400">擅长疾病：{{ item.goodatdisease }}</p>
                              <div class="mt-10 space-y-4">
                                <h5 class="text-lg font-bold">医院简介</h5>
                                <p class="text-base text-gray-500">{{ item.content }}</p>
                              </div>
                            </div>
                          </el-scrollbar>
                          <p class="mt-3 text-center text-xs text-gray-400">*药品信息源自“光大健康APP网”，本报告仅做展示使用</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>
    </main>
  </el-scrollbar>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { ElScrollbar } from 'element-plus'
import type { ReportInter, tabsInter } from '@/types/report.ts'

const route = useRoute()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const tabs: tabsInter = reactive({
  active: 'bottomGaiShu',
  list: [
    { name: 'bottomGaiShu', tab: '概述' },
    { name: 'bottomZhengZhuang', tab: '症状' },
    { name: 'bottomBingYin', tab: '病因' },
    { name: 'bottomRiChangHuLi', tab: '日常护理' },
    { name: 'bottomGuoJiZhiLiao', tab: '国际治疗方式' }
  ],
  change: () => {
    let tabsDOM:any = document.getElementById('tabsId')
    scrollbarRef.value!.setScrollTop(tabsDOM.offsetTop)
  }
})

const report: ReportInter = reactive({
  productActive: 0,
  productImgActive: 0,
  info: {
    id: '',
    // 付费信息
    stateName: '',          // 状态名称
    payNum: '/',            // 支付单号
    payTime: '/',           // 付款时间
    payWay: '/',            // 支付方式
    payPrice: '/',          // 支付金额
    // 报告信息
    numId: '',              // 编号
    name: '',               // 姓名
    gender: '',             // 性别
    age: '',                // 年龄
    dateStr: '',            // 日期
    hospitalName: '',       // 生成机构
    doctorName: '',         // 医生姓名
    departmentName: '',     // 医生科室
    jobName: '',            // 医生职位
    diseaseName: '',        // 疾病名称
    diseaseEngName: '',     // 疾病名称（英文）
    departmentName1: '',    // 所属科室
    bottomGaiShu: '',
    bottomZhengZhuang: '',
    bottomBingYin: '',
    bottomRiChangHuLi: '',
    bottomGuoJiZhiLiao: '',
    bottomGuoJiZhiLiaoHospital: ''
  },
  changeProcuct: (index: number):void => {
    report.productImgActive = 0
    report.productActive = index
  }
})


const reportRes = await api.get('/datacenter/report/updateReportDetail', {id: route.params.id})
if (reportRes.code === 200) Object.assign(report.info, reportRes.data)
</script>

<style scoped>
th {
  @apply border h-10 bg-gray-100
}
td {
  @apply border text-t2 text-center
}
</style>