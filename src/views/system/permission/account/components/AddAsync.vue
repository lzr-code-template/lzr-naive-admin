<template>
  <div class="p-4 space-y-4">
    <p class="text-xl font-bold">添加</p>
    <el-form 
      ref="formRef"
      :model="form" 
      :rules="rules"
      label-width="120px"
      class="w-1/2"
    >
      <!-- 手机号 -->
      <el-form-item label="手机号：" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号，该号码为登录账号"
          maxlength="11"
          show-word-limit
          clearable
        />
      </el-form-item>
      <!-- 姓名 -->
      <el-form-item label="姓名：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入使用者姓名"
          clearable
        />
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色：" prop="role">
        <div v-if="isNonEmptyArray(roleList)">
          <el-checkbox-group v-model="form.role">
            <el-checkbox 
              v-for="(item, index) in roleList" 
              :key="index" 
              :label="item.value" 
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
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
import type { FormInstance, FormRules } from 'element-plus'
import { useKeepaliveStore } from '@/store/keepalive'
import { isNonEmptyArray } from '@/until/array'

const router = useRouter()
interface OptionInter {
  label: string
  value: number
}

const roleList = ref<OptionInter[]>([])

// 表单
interface formInter {
  mobile: string
  name: string
  role: number[]
}
const formRef = ref<HTMLElement | null | any>(null)
const form = reactive<formInter>({
  mobile: '',     // 手机号
  name: '',       // 姓名
  role: [],       // 角色
})
const rules = reactive<FormRules<formInter>>({
  mobile: [
    { required: true, message: '请输入手机号'},
    { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确", trigger: "blur" }
  ],
  name: [{ required: true, message: '请输入姓名'}],
  role: [{ required: true, message: '请为账号分配角色'}]
})

const submitForm = async(formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: '正在提交数据…'
      })
      api.get('/system/account/addAdmin', {
        mobile: form.mobile,
        name: form.name,
        role: form.role.join(',')
      }).then((res) => {
        if(res.code === 200) {
          useKeepaliveStore().removeKeepAlive('SystemPermissionAccount')
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
  const [roleRes] = await Promise.all([
    api.get('/system/account/getRoleList')
  ])
  if (roleRes.code === 200) {
    roleList.value = roleRes.data.map((item: { name: string; id: number }) => ({
      label: item.name,
      value: item.id
    }))
  }
} catch (error) {
  console.error('Error occurred while fetching data:', error)
}
</script>