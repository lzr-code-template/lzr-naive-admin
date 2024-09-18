import { UserIcon } from '@heroicons/vue/24/outline'

export default [
  /** ----- 用户管理 -> 用户列表 ----- */
  {
    path: '/user/user',
    name: 'UserUser',
    component: () => import('@/views/user/user/index.vue'),
    meta: {
      name: 'UserUser',
      keepAlive: true,
      breadItems: [
        { title: '用户管理', icon: UserIcon, path: null, breadKey: 'user' },
        { title: '用户列表', path: null },
      ],
    },
  },
  /** ----- 用户管理 -> 身份证列表 ----- */
  {
    path: '/user/IDcard',
    name: 'UserIDcard',
    component: () => import('@/views/user/IDcard/index.vue'),
    meta: {
      name: 'UserIDcard',
      keepAlive: true,
      breadItems: [
        { title: '用户管理', icon: UserIcon, path: null, breadKey: 'user' },
        { title: '身份证列表', path: null },
      ],
    },
  },
]
