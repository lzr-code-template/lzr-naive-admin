import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './page-loading-guard'
import { createPermissionGuard } from './permission-guard'

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createPermissionGuard(router)
}
