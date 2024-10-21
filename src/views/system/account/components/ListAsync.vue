<template>
  <main class="space-y-2 py-4">
    <!-- section: 筛选区 -->
    <section
      ref="filterRef"
      class="flex flex-wrap"
    >
      <!-- 姓名 -->
      <div class="f-c-c mb-4 mr-10 w-72 space-x-2">
        <p class="shrink-0 text-sm">姓名：</p>
        <n-input
          v-model:value="filter.data.name"
          placeholder="请输入要查询的姓名"
          clearable
        >
          <template #suffix>
            <MagnifyingGlassIcon class="size-4 text-gray-400" />
          </template>
        </n-input>
      </div>
      <!-- 角色 -->
      <div class="f-c mb-4 mr-10 w-72 space-x-2">
        <p class="shrink-0 text-sm">角色：</p>
        <n-select
          v-model:value="filter.data.roleid"
          :options="filter.roleOptions"
          label-field="name"
          value-field="id"
          filterable
          clearable
        />
      </div>
      <!-- 状态 -->
      <div class="f-c mb-4 mr-10 w-72 space-x-2">
        <p class="shrink-0 text-sm">状态：</p>
        <n-select
          v-model:value="filter.data.zaixian"
          :options="filter.zaixianOptions"
          clearable
        />
      </div>
      <!-- btn -->
      <div class="f-c mb-4 mr-10 space-x-4">
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
        @click="modal.open('新增账号', null)"
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
  <!-- 添加、编辑 -->
  <n-modal v-model:show="modal.show">
    <n-spin :show="modal.loading">
      <n-card
        :title="modal.title"
        :bordered="false"
        closable
        style="width: 425px"
        @close="modal.show = false"
      >
        <n-form
          ref="formModalRef"
          :model="modal.data"
          :rules="modal.rules"
          label-placement="left"
          label-width="100"
          require-mark-placement="left"
          class="mt-6 pr-4"
        >
          <n-form-item label="姓名：" path="name">
            <n-input v-model:value="modal.data.name" placeholder="请输入姓名" clearable />
          </n-form-item>
          <n-form-item label="性别：" path="gender">
            <n-select
              v-model:value="modal.data.gender"
              :options="modal.genderOptions"
            />
          </n-form-item>
          <n-form-item label="角色：" path="roleid">
            <n-select
              v-model:value="modal.data.roleid"
              :options="filter.roleOptions"
              placeholder="请选择角色"
              label-field="name"
              value-field="id"
              filterable
              clearable
            />
          </n-form-item>
          <n-form-item label="状态：" path="zaixian">
            <n-select
              v-model:value="modal.data.zaixian"
              :options="filter.zaixianOptions"
            />
          </n-form-item>
          <n-form-item label="手机号：" path="mobile">
            <div class="w-full space-y-2">
              <n-input v-model:value="modal.data.mobile" :maxlength="11" placeholder="请输入手机号" clearable />
              <p class="text-xs text-gray-400">（初始密码：12345678）</p>
            </div>
          </n-form-item>
          <n-form-item>
            <div class="f-c-c mt-4 w-full space-x-4">
              <div class="w-20">
                <n-button
                  attr-type="button"
                  block
                  @click="modal.show = false"
                >
                  取消
                </n-button>
              </div>
              <div class="w-20">
                <n-throttle-button
                  type="primary"
                  :loading="modal.btnLoading"
                  block
                  text="保存"
                  @click="modal.handleValidateClick"
                />
              </div>
            </div>
          </n-form-item>
        </n-form>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { pick } from 'lodash-es'
import type { DataTableFilterState, FormInst, FormItemRule } from 'naive-ui'
import api from '@/api/index'
import { validatorMobile } from '@/utils'
import { useTable } from '@/composables/useTable'
import type { FilterInter, ModalInter, ParamsInter } from '@/types/system/account'

const router = useRouter()
router.beforeEach((to, from, next) => {
  if (from.name === 'SystemRoleEdit') {
    table.loading = true
    table.getList(true)
  }
  next()
})

const clientHeight = useWindowSize().height
const params: ParamsInter = reactive({
  size: 20,
  currentPage: 1,
  name: '',
  roleid: null,
  zaixian: null,
})

/** section1 筛选区 */
const filterRef = ref<HTMLElement>()
const filter: FilterInter = reactive({
  // 筛选区所占高度
  height: useElementSize(filterRef).height,
  // 角色 options
  roleOptions: [],
  // 报告状态 options
  zaixianOptions: [
    { label: '禁用', value: 0 },
    { label: '启用', value: 1 },
  ],
  // 筛选区数据
  data: {
    name: '', // 名称
    roleid: null, // 角色id
    zaixian: null, // 状态
  },
  // 重置
  reset: () => {
    table.loading = true
    filter.data.name = params.name = ''
    filter.data.roleid = params.roleid = null
    table.columns.forEach((item) => {
      if (item.key === 'zaixian') { item.filterOptionValue = params.zaixian = filter.data.zaixian = null }
    })
    nextTick(() => table.getList(false))
  },
  // 查询
  search: () => {
    table.loading = true
    params.name = filter.data.name
    params.roleid = filter.data.roleid
    table.columns.forEach((item) => {
      if (item.key === 'zaixian') { item.filterOptionValue = params.zaixian = filter.data.zaixian }
    })
    nextTick(() => table.getList(false))
  },
})

/** section2 表单区 */
const columns = [
  {
    title: '序号',
    width: '70',
    align: 'center',
    render(_: object, index: number) { return `${(table.pagination.page - 1) * table.pagination.pageSize + index + 1}` },
  },
  {
    title: 'ID',
    key: 'id',
    align: 'center',
  },
  {
    title: '姓名',
    key: 'name',
    align: 'center',
  },
  {
    title: '性别',
    key: 'gender',
    align: 'center',
    render(row: {
      gender: number
    }) { return ['女', '男'][row.gender] },
  },
  {
    title: '手机号',
    key: 'mobile',
    align: 'center',
  },
  {
    title: '角色',
    key: 'rolename',
    align: 'center',
  },
  {
    title: '状态',
    key: 'zaixian',
    align: 'center',
    render(row: {
      id: number
      name: string
      zaixian: string
    }) {
      return h(
        NTag,
        {
          class: '-ml-5',
          size: 'small',
          bordered: false,
          type: +row.zaixian === 0 ? 'error' : 'success',
        },
        {
          default: () => +row.zaixian === 0 ? '禁用' : '启用',
        },
      )
    },
    filter: true,
    filterMultiple: false,
    filterOptionValue: null,
    filterOptions: filter.zaixianOptions,
  },
  {
    title: '操作',
    key: '',
    align: 'center',
    fixed: 'right',
    render(row: {
      id: number
    }) {
      return h(
        'div',
        { class: 'f-c-c space-x-2.5' },
        [
          h(NButton, {
            type: 'primary',
            text: true,
            onClick: () => modal.open('编辑账号', row.id),
          }, {
            default: () => '编辑',
          }),
        ],
      )
    },
  },
]
const { table } = useTable('/system/account/getAdminUserPage', params, columns, {
  handleFiltersChange: (filters: DataTableFilterState) => {
    table.loading = true
    table.columns.forEach((item) => {
      if (item.key === 'zaixian') { item.filterOptionValue = params.zaixian = filter.data.zaixian = filters.zaixian as number | null }
    })
    nextTick(() => table.getList(false))
  },
})

/** modal */
const formModalRef = ref<FormInst | null>()
const modal: ModalInter = reactive({
  show: false,
  loading: true,
  btnLoading: false,
  title: '',
  genderOptions: [
    { label: '男', value: '1' },
    { label: '女', value: '0' },
  ],
  data: {
    id: null,
    name: '', // 姓名
    gender: '0', // 性别
    roleid: null, // 角色
    zaixian: 1, // 状态
    mobile: '', // 手机号
  },
  rules: {
    name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'input'] }],
    roleid: [{ required: true, type: 'number', message: '请选择角色', trigger: ['blur', 'change'] }],
    mobile: [
      { required: true, message: '请输入手机号', trigger: ['blur', 'input'] },
      { validator: (rule: FormItemRule, value: any) => validatorMobile(value), min: 11, max: 11, message: '手机号格式不正确', trigger: ['blur', 'input'] },
    ],
  },
  init: () => {
    modal.data.id = modal.data.roleid = null
    modal.data.name = modal.data.mobile = ''
    modal.data.gender = '1'
    modal.data.zaixian = 1
  },
  open: (title, id = null) => {
    modal.init()
    modal.title = title
    if (title === '新增账号') {
      modal.show = true
      modal.loading = false
    }
    if (title === '编辑账号') {
      modal.show = modal.loading = true
      api.get('/system/account/updateAdminUserDetail', { id }).then((res) => {
        if (res.code === 200) {
          Object.assign(modal.data, pick(res.data, ['id', 'name', 'gender', 'roleid', 'zaixian', 'mobile']))
          nextTick(() => modal.loading = false)
        }
        else {
          modal.show = modal.loading = false
        }
      })
    }
  },
  handleValidateClick: () => {
    formModalRef.value?.validate((errors) => {
      if (!errors) {
        window.$message?.loading('操作中...')
        modal.btnLoading = true
        if (modal.title === '新增账号') {
          api.post('/system/account/addAdminUser', modal.data).then((res) => {
            if (res.code === 200) {
              window.$message?.destroyAll()
              modal.show = false
              modal.btnLoading = false
              window.$message?.success('操作成功')
              table.getList(false)
            }
            else {
              window.$message?.destroyAll()
              modal.btnLoading = false
            }
          })
        }
        if (modal.title === '编辑账号') {
          api.post('/system/account/updateAdminUser', modal.data).then((res) => {
            if (res.code === 200) {
              window.$message?.destroyAll()
              modal.show = false
              modal.btnLoading = false
              window.$message?.success('操作成功')
              table.getList(true)
            }
            else {
              window.$message?.destroyAll()
              modal.btnLoading = false
            }
          })
        }
      }
      else {
        errors.forEach((item) => {
          window.$message?.warning(item[0].message as string)
        })
      }
    })
  },
})

const roleRes = await api.get('/system/account/getRoleList')
if (roleRes.code === 200) { filter.roleOptions = roleRes.data }

table.getList(false) // 获取表单
</script>
