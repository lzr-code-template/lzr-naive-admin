export default [
  /** ----- 系统管理 -> 角色管理 ----- **/
  {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('@/views/system/role/index.vue'),
    meta: {
      name: 'SystemRole',
      keepAlive: true
    }
  },
  // 系统管理 - 角色管理 - 添加
  {
    path: '/system/role/add',
    name: 'SystemRoleAdd',
    component:() => import('@/views/system/role/add.vue'),
    meta: { 
      name: 'SystemRole',
      keepAlive: false
    }
  },
  // 系统管理 - 角色管理 - 编辑 
  {
    path: '/system/role/edit/:id',
    name: 'SystemRoleEdit',
    component:() => import('@/views/system/role/edit.vue'),
    meta: { 
      name: 'SystemRole',
      keepAlive: false
    }
  },
  /** ----- 系统管理 -> 账号管理 ----- **/
  {
    path: '/system/account',
    name: 'SystemAccount',
    component: () => import('@/views/system/account/index.vue'),
    meta: {
      name: 'SystemAccount',
      keepAlive: true
    }
  }
]