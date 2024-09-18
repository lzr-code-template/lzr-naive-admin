import { DocumentTextIcon } from '@heroicons/vue/24/outline'

export default [
  /** ----- 订单管理 -> 订单列表 ----- */
  {
    path: '/order/order',
    name: 'OrderOrder',
    component: () => import('@/views/order/order/index.vue'),
    meta: {
      name: 'OrderOrder',
      keepAlive: true,
      breadItems: [
        { title: '订单管理', icon: DocumentTextIcon, path: null, breadKey: 'order' },
        { title: '订单列表', path: null },
      ],
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
      breadItems: [
        { title: '订单管理', icon: DocumentTextIcon, path: null, breadKey: 'order' },
        { title: '订单列表', path: '/order/order' },
        { title: '订单详情', path: null },
      ],
    },
  },
]
