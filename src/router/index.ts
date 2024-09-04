import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
})

export async function setupRouter(app: App) {
  setupRouterGuard(router)
  app.use(router)
}
