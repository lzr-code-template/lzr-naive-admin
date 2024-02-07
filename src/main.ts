import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ElMessage, ElMessageBox, ElLoading, ElNotification } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import VueDOMPurifyHTML from 'vue-dompurify-html'
import VueCookies from 'vue-cookies'

const app = createApp(App)
// const Cookies:any = VueCookies
// app.provide('$cookies', VueCookies)
app.provide('$cookies', VueCookies)

app.use(router)
app.use(pinia)
app.use(ElMessage)
app.use(ElMessageBox)
app.use(ElLoading)
app.use(ElNotification)
app.use(VueDOMPurifyHTML)
app.mount('#app')
