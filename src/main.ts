import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import VueDOMPurifyHTML from 'vue-dompurify-html'
import VueCookies from "vue-cookies"

const app = createApp(App)
app.provide('$cookies', VueCookies)

app.use(router)
app.use(pinia)
app.use(VueDOMPurifyHTML)
app.mount('#app')
