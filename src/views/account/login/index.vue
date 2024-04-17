<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div class="hidden lg:block lg:w-2/3 bg-login bg-cover">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">YOUR CITY ADMIN</h2>
            <p class="max-w-xl mt-3 text-t1">When she was younger, she would pretend. That her bedroom was a castle, she was fairest in the land. And she got older, and it all changed. There was no time for make believe and all the magic slipped away</p>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-t2 dark:text-white">欢迎登录</h2>
            <p class="mt-3 text-t1 dark:text-t1">请输入您的账号密码</p>
          </div>
          <div class="mt-8">
            <form>
              <div>
                <label class="block mb-2 text-sm text-t2 dark:text-gray-200">账号</label>
                <input 
                  v-model="loginInfo.phone"
                  placeholder="请输入您的账号"
                  class="block w-full px-4 py-2 mt-2 text-t2 placeholder-placeholder bg-white border border-gray-200 rounded dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
              </div>
              <div class="mt-6">
                <div class="flex justify-between mb-2">
                  <label class="text-sm text-t2 dark:text-gray-200">密码</label>
                </div>
                <input 
                  v-model="loginInfo.password"
                  type="password" 
                  placeholder="请输入您的密码"
                  class="block w-full px-4 py-2 mt-2 text-t2 placeholder-placeholder bg-white border border-gray-200 rounded dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
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
                <n-throttle-button 
                  type="primary"
                  size="large"
                  :loading="btnLoading"
                  block
                  text="登录"
                  @click="handleLogin"
                />
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
const message = useMessage()
const notification = useNotification()
const btnLoading = ref<boolean>(false)
const loginInfo: LoginInter = reactive({
  loginType: true,
  captcha: '',
  phone: '',
  password: '',
})
const handleLogin = ():void => {
  const { phone, password } = loginInfo
  if (!phone || !password) {
    message.warning('请输入用户名和密码')
  } else {
    message.loading('登录中...')
    btnLoading.value = true
    api.post('/open/login', {
      phone,
      password: crypto.Encrypt(password),
    }).then((res) => {
      if (res.code === 200) {
        $cookies.set('token', res.data.token)
        $cookies.set('user', res.data.user)
        nextTick(() => {
          message.destroyAll()
          notification.success({
            content: '登录成功',
            meta: `欢迎你，${res.data.user.name}`,
            duration: 2500
          })
          router.replace('/')
        })
      } else {
        message.destroyAll()
        btnLoading.value = false
      }
    }).catch(() => {
      message.destroyAll()
      btnLoading.value = false
    })
    setTimeout(() => {
      if (btnLoading.value) {
        btnLoading.value = false
        message.destroyAll()
      }
    }, 10000)
  }
}
</script>