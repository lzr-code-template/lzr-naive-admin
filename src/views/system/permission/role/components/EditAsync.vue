<template>
  <div class="p-4 space-y-4">
    <p class="text-xl font-bold">编辑</p>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="w-1/2"
    >
      <!-- 角色名称 -->
      <el-form-item label="角色名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称，最多10个字符"
          :maxlength="10"
          show-word-limit
          clearable
        />
      </el-form-item>
      <!-- 角色名称 -->
      <el-form-item label="角色描述：" prop="content">
        <el-input
          v-model="form.content"
          :autosize="{ minRows: 3, maxRows: 4 }"
          type="textarea"
          placeholder="请输入内容"
          :maxlength="50"
          show-word-limit
          clearable
        />
      </el-form-item>
      <!-- 权限设置 -->
      <el-form-item label="权限设置：" prop="perm">
        <div class="w-full h-full border rounded">
          <div class="h-10 flex items-center px-4 bg-gray-200 font-bold">选择权限</div>
          <div class="p-2">
            <el-tree
              ref="permTreeRef"
              :data="permList"
              :default-checked-keys="form.permDefault"
              default-expand-all
              node-key="id"
              show-checkbox
              @check="handleCheck"
            />
          </div>
        </div>
      </el-form-item>
      <!-- button -->
      <el-form-item>
        <el-button 
          size="large" 
          class="w-24"
          @click="$router.back()"
        >
          取消
        </el-button>
        <el-button
          type="primary" 
          size="large"
          class="w-24"
          @click="submitForm(formRef)"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { pick } from 'lodash-es'
import type { FormInstance, FormRules } from 'element-plus'
import { useKeepaliveStore } from '@/store/keepalive'
import { isNonEmptyArray } from '@/until/array'

const route = useRoute()
const router = useRouter()

// 权限树
interface TreeNode {
  id: number
  label: string
  children: TreeNode | null
}
const permTreeRef = ref<HTMLElement | null | any>(null)
const permList = ref<TreeNode[]>([])
const handleCheck = () => {
  let checkedKeys = permTreeRef.value.getCheckedKeys()
  if(isNonEmptyArray(checkedKeys)) {
    form.perm = permTreeRef.value.getCheckedKeys().join(',')
  } else {
    form.perm = ''
  }
}

// 表单
interface formInter {
  id: string
  name: string
  content: string
  perm: string
  permDefault: number[]
}
const formRef = ref<HTMLElement | null | any>(null)
const form = reactive<formInter>({
  id: route.params.id as string,
  name: '',       // 名称
  content: '',    // 描述
  perm: '',       // 权限
  permDefault: []
})
const rules = reactive<FormRules<formInter>>({
  name: [{ required: true, message: '请输入角色名称'}],
  content: [{ required: true, message: '请输入角色描述'}],
  perm: [{ required: true, message: '请选择权限'}]
})

const submitForm = async(formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: '正在提交数据…'
      })
      api.get('/system/role/updateRole', pick(form, ['id', 'name', 'content', 'perm'])).then((res) => {
        if(res.code === 200) {
          useKeepaliveStore().removeKeepAlive('SystemPermissionRole')
          ElMessage({ message: res.msg, type: 'success'})
          router.back()
        }
        nextTick(() => loading.close())
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 获取权限列表
try {
  const [premRes, detailRes] = await Promise.all([
    api.get('/system/role/getPermList'),
    api.get('/system/role/updateAdminRoleDetail', { id: route.params.id })
  ])
  if (premRes.code === 200) permList.value = premRes.data
  if (detailRes.code === 200) {
    form.name = detailRes.data.name
    form.content = detailRes.data.content
    form.perm = JSON.parse(detailRes.data.perm).join(',')
    form.permDefault = JSON.parse(detailRes.data.perm) 
  }
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>