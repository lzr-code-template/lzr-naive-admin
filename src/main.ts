import './assets/css/style.css'

import { createApp } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupRouter } from './router'
import { setupNaiveDiscreteApi } from './utils'
import App from './App.vue'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.use(pinia)
  app.use(VueDOMPurifyHTML)
  app.mount('#app')
  setupNaiveDiscreteApi()
}

setupApp()
