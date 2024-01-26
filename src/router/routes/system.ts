export default [
  /** ----- 权限管理 -> 角色管理 ----- **/
  // ---- 列表 ----
  {
    path: '/system-permission-role',
    name: 'SystemPermissionRole',
    component: () => import('@/views/system/permission/role/index.vue'),
    meta: { 
      classList: ['system', 'permission', 'role'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '角色管理', name: 'SystemPermissionRole' }
      ],
      keepAlive: true
    }
  },
  // ---- 添加 ----
  {
    path: '/system-permission-role/add',
    name: 'SystemPermissionRoleAdd',
    component: () => import('@/views/system/permission/role/add.vue'),
    meta: { 
      classList: ['system', 'permission', 'role'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '角色管理', name: 'SystemPermissionRole' },
        { title: '添加', name: 'SystemPermissionRoleAdd' }
      ],
      keepAlive: false
    }
  },
  // ---- 编辑 ----
  {
    path: '/system-permission-role/edit/:id',
    name: 'SystemPermissionRoleEdit',
    component: () => import('@/views/system/permission/role/edit.vue'),
    meta: { 
      classList: ['system', 'permission', 'role'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '角色管理', name: 'SystemPermissionRole' },
        { title: '编辑', name: 'SystemPermissionRoleEdit' }
      ],
      keepAlive: false
    }
  },
  /** ----- 权限管理 -> 账号管理 ----- **/
  // ---- 列表 ----
  {
    path: '/system-permission-account',
    name: 'SystemPermissionAccount',
    component: () => import('@/views/system/permission/account/index.vue'),
    meta: { 
      classList: ['system', 'permission', 'account'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '账号管理', name: 'SystemPermissionAccount' }
      ],
      keepAlive: true
    }
  },
  // ---- 添加 ----
  {
    path: '/system-permission-account/add',
    name: 'SystemPermissionAccountAdd',
    component: () => import('@/views/system/permission/account/add.vue'),
    meta: { 
      classList: ['system', 'permission', 'account'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '账号管理', name: 'SystemPermissionAccount' },
        { title: '添加', name: 'SystemPermissionAccountAdd' }
      ],
      keepAlive: false
    }
  },
  // ---- 编辑 ----
  {
    path: '/system-permission-account/edit/:id',
    name: 'SystemPermissionAccountEdit',
    component: () => import('@/views/system/permission/account/edit.vue'),
    meta: { 
      classList: ['system', 'permission', 'account'],
      breadcrumb: [
        { title: '系统管理', name: '' }, 
        { title: '权限管理', name: '' }, 
        { title: '账号管理', name: 'SystemPermissionAccount' },
        { title: '编辑', name: 'SystemPermissionAccountEdit' }
      ],
      keepAlive: false
    }
  },
]