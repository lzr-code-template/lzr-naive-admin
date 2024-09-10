import type { Router } from 'vue-router'
import { useKeepaliveStore } from '@/store'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to) => {
    const token = localStorage.getItem('token')
    if (to.path === '/account/login') {
      return true
    }
    else if (!token) {
      useKeepaliveStore().clearKeepAlive()
      return { path: '/account/login' }
    }
    else {
      if (to.meta.keepAlive) {
        useKeepaliveStore().addKeepAlive(to.name as string)
      }
      return true
    }
  })
}
