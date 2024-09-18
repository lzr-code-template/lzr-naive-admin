import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

export default [
  /** ----- 系统管理 -> 角色管理 ----- */
  {
    path: '/system/role',
    name: 'SystemRole',
    component: () => import('@/views/system/role/index.vue'),
    meta: {
      name: 'SystemRole',
      keepAlive: true,
      breadItems: [
        { title: '系统管理', icon: Cog6ToothIcon, path: null, breadKey: 'system' },
        { title: '角色管理', path: null },
      ],
    },
  },
  // 系统管理 - 角色管理 - 添加
  {
    path: '/system/role/add',
    name: 'SystemRoleAdd',
    component: () => import('@/views/system/role/add.vue'),
    meta: {
      name: 'SystemRole',
      keepAlive: false,
      breadItems: [
        { title: '系统管理', icon: Cog6ToothIcon, path: null, breadKey: 'system' },
        { title: '角色管理', path: '/system/role' },
        { title: '添加角色', path: null },
      ],
    },
  },
  // 系统管理 - 角色管理 - 编辑
  {
    path: '/system/role/edit/:id',
    name: 'SystemRoleEdit',
    component: () => import('@/views/system/role/edit.vue'),
    meta: {
      name: 'SystemRole',
      keepAlive: false,
      breadItems: [
        { title: '系统管理', icon: Cog6ToothIcon, path: null, breadKey: 'system' },
        { title: '角色管理', path: '/system/role' },
        { title: '编辑角色', path: null },
      ],
    },
  },
  /** ----- 系统管理 -> 账号管理 ----- */
  {
    path: '/system/account',
    name: 'SystemAccount',
    component: () => import('@/views/system/account/index.vue'),
    meta: {
      name: 'SystemAccount',
      keepAlive: true,
      breadItems: [
        { title: '系统管理', icon: Cog6ToothIcon, path: null, breadKey: 'system' },
        { title: '账号管理', path: null },
      ],
    },
  },
]
