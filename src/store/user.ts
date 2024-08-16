import { defineStore } from 'pinia'
import type { UserInter } from '@/types/account/login'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInter>({
    gender: '',
    id: 0,
    inserttime: '',
    mobile: '',
    name: '',
    password: '',
    roleid: 0,
    state: 0,
  })
  const setUser = (data: UserInter) => {
    Object.assign(user.value, data)
  }
  const initUser = () => {
    setUser({
      gender: '',
      id: 0,
      inserttime: '',
      mobile: '',
      name: '',
      password: '',
      roleid: 0,
      state: 0,
    })
  }
  return {
    user,
    setUser,
    initUser,
  }
}, {
  persist: true, // 支持持久化
})
