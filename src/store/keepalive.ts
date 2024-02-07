import { defineStore } from 'pinia'

export const useKeepaliveStore = defineStore('keepalive', () => {
  const includeList = ref<string[]>([])
  // 添加缓存
  const addKeepAlive = (name:string):void => {
    if(!includeList.value.includes(name)) {
      includeList.value.push(name)
      if(includeList.value.length > 10) includeList.value.shift()
    }
  }
   // 删除缓存
   const removeKeepAlive = (name:string):void => {
    let index = includeList.value.indexOf(name)
    if (index > -1) {
      includeList.value.splice(index, 1)
    }
  }
  // 清空缓存
  const clearKeepAlive = ():void => {
    includeList.value = []
  }
  return {
    includeList,
    addKeepAlive,
    removeKeepAlive,
    clearKeepAlive
  }
},{
  persist: true       // 支持持久化
})