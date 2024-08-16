import type { Router } from 'vue-router'
import { progress } from '@/utils'

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(() => {
    progress.start()
  })

  router.afterEach(() => {
    progress.done()
  })
}
