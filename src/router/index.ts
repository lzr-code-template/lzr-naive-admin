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

// router.beforeEach((to, from, next) => {
//   progress.start()
//   if (to.path === '/account/login') {
//     next()
//   }
//   else if (!$cookies.get('token')) {
//     useKeepaliveStore().clearKeepAlive()
//     next('/account/login')
//   }
//   else {
//     if (to.meta.keepAlive) { useKeepaliveStore().addKeepAlive(to.name as string) }
//     next() // 继续导航
//   }
// })

// router.afterEach(() => {
//   progress.done() // 进度条结束
// })

// export default router
