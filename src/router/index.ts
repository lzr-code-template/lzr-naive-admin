import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { useKeepaliveStore } from '@/store/keepalive'
import NProgress from '@/until/progress'

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/account/login') {
    next()
  } else if (!$cookies.get('token')) {
    useKeepaliveStore().clearKeepAlive()
    next('/account/login')
  } else {
    if (to.meta.keepAlive) useKeepaliveStore().addKeepAlive(to.name as string)
    next() // 继续导航
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 进度条结束
})

export default router
