<template>
  <div class="py-4">
    <h2 class="text-lg font-bold">新建角色</h2>
    <div class="mt-7 px-20">
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="110"
        require-mark-placement="left"
        class="w-2/3 2xl:w-1/2"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="角色名称：" path="name">
            <n-input 
              v-model:value="form.name" 
              placeholder="请输入角色名称" 
              clearable 
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="状态：" path="zaixian">
            <n-select 
              v-model:value="form.zaixian" 
              :options="zaixianOptions" 
              filterable clearable
            />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="选择权限：" path="perm">
            <div class="border rounded w-full py-3 pl-3">
              <n-scrollbar class="max-h-[500px]">
                <n-tree
                  :data="perm.list"
                  :default-checked-keys="perm.default"
                  check-strategy="child"
                  key-field="id"
                  checkable
                  expand-on-click
                  default-expand-all
                  multiple
                  cascade
                  selectable
                  @update:checked-keys="changeperm"
                />
              </n-scrollbar>
            </div>
          </n-form-item-gi>
          <n-form-item-gi :span="24">
            <div class="mt-4 f-c-c space-x-4 w-full">
              <div class="w-20">
                <n-button 
                  attr-type="button" 
                  block
                  @click="$router.back()"
                >
                  取消
                </n-button>
              </div>
              <div class="w-20">
                <n-throttle-button 
                  type="primary" 
                  :loading="btnLoading"
                  block
                  text="保存"
                  @click="handleValidateClick"
                />
              </div>
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { useKeepaliveStore } from '@/store/keepalive'
import { isNonEmptyArray } from '@/until/array'
import type { FormInst } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const btnLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>()
const form = reactive({
  name: '',         // 名称
  zaixian: null,    // 状态
  perm: '',         // 权限
})
const rules = {
  name: [{required: true, message: "请输入名称", trigger: ["blur", "input"]}],
  zaixian: [{required: true, type: 'number', message: "请选择角色状态", trigger: ["blur", "change"]}],
  perm: [{required: true, message: "请选择权限", trigger: ["blur", "change"]}],
}

const zaixianOptions = [
  { label: '禁用', value: 0 },
  { label: '启用', value: 1 }
]

const changeperm = (keys: Array<string | number>) => {
  form.perm = isNonEmptyArray(keys) ? JSON.stringify(keys) : ''
}

/** 保存数据 **/
const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.loading('保存中...')
      btnLoading.value = true
      api.post('/system/role/addAdminRole', form).then((res) => {
        if (res.code === 200) {
          useKeepaliveStore().removeKeepAlive('SystemRole')
          message.destroyAll()
          message.success('操作成功')
          nextTick(() => {
            router.back()
          })
        } else {
          message.destroyAll()
          btnLoading.value = false
        }
      })
    } else {
      errors.forEach(item => {
        // message.warning(item[0].message)
      })
    }
  })
}

// 权限列表获取
const perm = reactive({
  default: [],
  list: []
})
const permRes = await api.get('/system/role/getPermList')
if (permRes.code === 200) perm.list = permRes.data
</script>