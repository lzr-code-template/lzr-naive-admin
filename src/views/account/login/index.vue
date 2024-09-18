<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex h-screen justify-center">
      <div class="hidden bg-login bg-cover lg:block lg:w-2/3">
        <div class="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
          <div>
            <h2 class="text-4xl font-bold text-white">LT转运后台管理系统</h2>
            <p class="mt-3 max-w-xl text-t3">
              When she was younger, she would pretend. That her bedroom was a castle, she
              was fairest in the land. And she got older, and it all changed. There was no time for make believe and all
              the magic slipped away
            </p>
          </div>
        </div>
      </div>
      <div class="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-center text-4xl font-bold text-t2 dark:text-white">欢迎登录</h2>
            <p class="mt-3 text-t3 dark:text-t3">请输入您的账号密码</p>
          </div>
          <div class="mt-8">
            <form>
              <div>
                <label class="mb-2 block text-sm text-t2 dark:text-gray-200">账号</label>
                <input
                  v-model="loginInfo.phone"
                  autocomplete="username"
                  placeholder="请输入您的账号"
                  class="mt-2 block w-full rounded border border-gray-200 bg-white px-4 py-2 text-t2 placeholder:text-placeholder focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:placeholder:text-gray-600 dark:focus:border-blue-400"
                />
              </div>
              <div class="mt-6">
                <div class="mb-2 flex justify-between">
                  <label class="text-sm text-t2 dark:text-gray-200">密码</label>
                </div>
                <input
                  v-model="loginInfo.password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="请输入您的密码"
                  class="mt-2 block w-full rounded border border-gray-200 bg-white px-4 py-2 text-t2 placeholder:text-placeholder focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:placeholder:text-gray-600 dark:focus:border-blue-400"
                  @keydown.enter="handleLogin"
                />
              </div>
              <div class="mt-2 text-right">
                <n-popover placement="top-start" trigger="hover">
                  <template #trigger>
                    <button class="text-sm text-placeholder hover:text-primary">忘记密码?</button>
                  </template>
                  <span>请联系客服重置登录密码 电话：400-888-8888</span>
                </n-popover>
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
import { Encrypt } from '@/utils'
import { useUserStore } from '@/store'
import type { LoginInter } from '@/types/account/login'

const router = useRouter()
const btnLoading = ref<boolean>(false)
const userStore = useUserStore()

/** 表单 */
const loginInfo: LoginInter = reactive({
  loginType: true,
  captcha: '',
  phone: '',
  password: '',
})

/** 登录 */
const handleLogin = (): void => {
  const { phone, password } = loginInfo
  if (!phone || !password) {
    window.$message?.warning('请输入用户名和密码')
  }
  else {
    window.$message?.loading('登录中...')
    btnLoading.value = true
    api.post('/open/login', {
      phone,
      password: Encrypt(password),
    }).then((res) => {
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token)
        userStore.setUser(res.data.user)
        nextTick(() => {
          window.$message?.destroyAll()
          window.$notification?.success({
            content: '登录成功',
            meta: `欢迎你，${res.data.user.name}`,
            duration: 2500,
          })
          router.replace('/')
        })
      }
      else {
        window.$message?.destroyAll()
        btnLoading.value = false
      }
    }).catch(() => {
      window.$message?.destroyAll()
      btnLoading.value = false
    })
    setTimeout(() => {
      if (btnLoading.value) {
        btnLoading.value = false
        window.$message?.destroyAll()
      }
    }, 10000)
  }
}
</script>
