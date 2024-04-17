import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import router from '@/router'
import { stringify, parse } from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

const http: AxiosInstance = axios.create(defaultConfig)

// 在发起请求时进行拦截，获取token
http.interceptors.request.use(
  req => {
    req.headers.Authorization = $cookies.get('token')
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data
    }
    if (res.data.code === 404) {
      // ElMessage({ message: res.data.msg, type: 'warning'})
      return res.data
    }
  },
  error => {
    if (error.response.status === 401 && $cookies.get('token')) {
      $cookies.remove('user')
      $cookies.remove('token')
      // ElMessageBox.alert('登录超时，请重新登录', '提示', {
      //   type: 'info', 
      //   showClose: false, 
      //   confirmButtonText: '确定', 
      //   callback:() => router.replace('/account/login')
      // })
    } else {
      return Promise.reject(error)
    }
  }
)

interface ApiInter {  
  get: (url: string, params?: any, useQs?: boolean) => Promise<any>
  getBlob: (url: string, params?: any) => Promise<any>
  post: (url: string, params?: any, useQs?: boolean) => Promise<any>
  put: (url: string, params?: any, useQs?: boolean) => Promise<any>
  delete: (url: string, params?: any) => Promise<any>
}  
  
const api: ApiInter = {  
  get: function(url, params = {}, useQs = false) {  
    return new Promise((resolve) => {  
      http({ method: "get", url: url, params: useQs ? stringify(params) : params }).then((res) => { resolve(res) })  
    })  
  },  
  getBlob: function(url, params) {  
    return new Promise((resolve) => {  
      http({ method: "get", url: url, params: params, responseType: "blob"}).then((res) => { resolve(res) })  
    })  
  },  
  post: function(url, params = {}, useQs = false) {  
    let data = useQs ? stringify(params) : params;  
    return new Promise((resolve) => {  
      http({ method: "post", url: url, data: data }).then((res) => { resolve(res) })  
    })  
  },  
  put: function(url, params = {}, useQs = false) {  
    let data = useQs ? stringify(params) : params;  
    return new Promise((resolve) => {
      http({ method: "put", url: url, data: data }).then((res) => { resolve(res) })  
    })  
  },  
  delete: function(url, params = {}) {  
    return new Promise((resolve) => {  
      http({ method: "delete", url: url, params: params }).then((res) => { resolve(res) })  
    })  
  }  
}

export default api
