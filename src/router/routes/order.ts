export default [
  /** ----- 订单中心 -> 订单列表 ----- */
  {
    path: '/order/order',
    name: 'OrderOrder',
    component: () => import('@/views/order/order/index.vue'),
    meta: {
      name: 'OrderOrder',
      keepAlive: true,
    },
  },
  // 订单中心 - 订单列表 - 详情
  {
    path: '/order/order/detail/:id',
    name: 'OrderOrderListDetail',
    component: () => import('@/views/order/order/detail.vue'),
    meta: {
      name: 'OrderOrder',
      keepAlive: true,
    },
  },
]
