<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div class="hidden lg:block lg:w-2/3 bg-login bg-cover">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">三端数据服务系统</h2>
            <p class="max-w-xl mt-3 text-gray-500">IDC three-terminal data service system-a set of Medical Center, Order Center, Financial Center, system management in one of the background management system</p>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-600 dark:text-white">欢迎登录</h2>
            <p class="mt-3 text-gray-500 dark:text-gray-500">请输入您的账号密码</p>
          </div>
          <div class="mt-8">
            <form>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">账号</label>
                <input 
                  v-model="loginInfo.phone"
                  placeholder="请输入您的账号"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
              </div>
              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label class="text-sm text-gray-600 dark:text-gray-200">密码</label>
                </div>
                <input 
                  v-model="loginInfo.password"
                  type="password" 
                  placeholder="请输入您的密码"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                  @keydown.enter="handleLogin"
                />
              </div>
              <div class="mt-2 text-right">
                <el-popover
                  placement="top-start"
                  :width="190"
                  trigger="hover"
                  content="请联系客服重置登录密码 电话：400-888-8888"
                >
                  <template #reference>
                    <button class="text-sm text-placeholder hover:text-primary">忘记密码?</button>
                  </template>
                </el-popover>
              </div>
              <div class="mt-6">
                <el-button
                  type="primary"
                  size="large"
                  class="w-full"
                  :loading="btnLoading"
                  @click="handleLogin"
                >
                  登录
                </el-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import crypto from '@/until/crypto'
import type { LoginInter } from '@/types/login.ts'

const router = useRouter()
const $cookies = inject<any>('$cookies')

console.log($cookies)
const btnLoading = ref<boolean>(false)
const loginInfo: LoginInter = reactive({
  phone: '',
  password: '',
})
const handleLogin = ():void => {
  const { phone, password } = loginInfo
  if (!phone || !password) {
    ElMessage({ message: '请输入用户名和密码', type: 'warning'})
  } else {
    btnLoading.value = true
    const loading = ElLoading.service({
      lock: true,
      text: '登录中…'
    })
    api.post('/open/login', {
      phone,
      password: crypto.Encrypt(password),
    }).then((res) => {
      if (res.code === 200) {
        loading.close()
        $cookies.set('token', res.data.token)
        $cookies.set('user', res.data.user)
        nextTick(() => {
          ElNotification({
            title: '登录成功',
            message: `欢迎你，${res.data.user.name}`,
            type: 'success',
          })
          router.replace('/')
        })
      } else {
        loading.close()
        btnLoading.value = false
      }
    }).catch(() => {
      loading.close()
      btnLoading.value = false
    })
    setTimeout(() => {
      if (btnLoading.value) {
        // ElMessage({ type: 'warning', message: '请求超时，请重新尝试登录' })
        btnLoading.value = false
        loading.close()
      }
    }, 10000)
  }
}


</script>

<style scoped>
.el-button {
  @apply h-11
}
</style>