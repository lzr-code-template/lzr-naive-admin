export default [
  /** ----- 用户中心 -> 用户列表 ----- **/
  {
    path: '/user/user',
    name: 'UserUser',
    component: () => import('@/views/user/user/index.vue'),
    meta: {
      name: 'UserUser',
      keepAlive: true
    }
  },
  /** ----- 用户中心 -> 身份证列表 ----- **/
  {
    path: '/user/IDcard',
    name: 'UserIDcard',
    component: () => import('@/views/user/IDcard/index.vue'),
    meta: {
      name: 'UserIDcard',
      keepAlive: true
    }
  },
]