import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import { parse, stringify } from 'qs'
import { createDiscreteApi } from 'naive-ui'
import { router } from '@/router'

const { message, dialog } = createDiscreteApi(['message', 'dialog'])

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

const http: AxiosInstance = axios.create(defaultConfig)

// 在发起请求时进行拦截，获取token
http.interceptors.request.use(
  (req) => {
    req.headers.Authorization = localStorage.getItem('token') || ''
    return req
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res.data
    }
    if (res.data.code === 404) {
      message.warning(res.data.msg)
      return res.data
    }
  },
  (error) => {
    if (error.response.status === 401 && localStorage.getItem('token')) {
      localStorage.clear()
      dialog.info({
        title: '提示',
        content: '登录超时，请重新登录',
        positiveText: '确定',
        onPositiveClick: () => {
          router.replace('/account/login')
        },
      })
    }
    else {
      return Promise.reject(error)
    }
  },
)

interface ApiInter {
  get: (url: string, params?: any, useQs?: boolean) => Promise<any>
  getBlob: (url: string, params?: any) => Promise<any>
  post: (url: string, params?: any, useQs?: boolean) => Promise<any>
  put: (url: string, params?: any, useQs?: boolean) => Promise<any>
  delete: (url: string, params?: any) => Promise<any>
}

const api: ApiInter = {
  get(url, params = {}, useQs = false) {
    return new Promise((resolve) => {
      http({ method: 'get', url, params: useQs ? stringify(params) : params }).then((res) => { resolve(res) })
    })
  },
  getBlob(url, params) {
    return new Promise((resolve) => {
      http({ method: 'get', url, params, responseType: 'blob' }).then((res) => { resolve(res) })
    })
  },
  post(url, params = {}, useQs = false) {
    const data = useQs ? stringify(params) : params
    return new Promise((resolve) => {
      http({ method: 'post', url, data }).then((res) => { resolve(res) })
    })
  },
  put(url, params = {}, useQs = false) {
    const data = useQs ? stringify(params) : params
    return new Promise((resolve) => {
      http({ method: 'put', url, data }).then((res) => { resolve(res) })
    })
  },
  delete(url, params = {}) {
    return new Promise((resolve) => {
      http({ method: 'delete', url, params }).then((res) => { resolve(res) })
    })
  },
}

export default api
