export default [
  /** ----- 订单统计 -> 订单明细 ----- **/
  // ---- 列表 ----
  {
    path: '/order-stat-details',
    name: 'OrderStatDetails',
    component: () => import('@/views/order/stat/details/index.vue'),
    meta: {
      class1: 'order',
      class2: 'stat',
      class3: 'details',
      classList: ['order', 'stat', 'details'],
      breadcrumb: [
        { title: '订单中心', name: '' }, 
        { title: '订单统计', name: '' }, 
        { title: '订单明细', name: 'OrderStatDetails' }
      ],
      keepAlive: true
    }
  },
  // ---- 详情 ----
  {
    path: '/order-stat-details/detail/:id',
    name: 'OrderStatDetailsDetail',
    component: () => import('@/views/order/stat/details/detail.vue'),
    meta: {
      class1: 'order',
      class2: 'stat',
      class3: 'details',
      classList: ['order', 'guide', 'details'],
      breadcrumb: [
        { title: '订单中心', name: '' },
        { title: '订单统计', name: '' },
        { title: '订单明细', name: 'OrderStatDetails' },
        { title: '订单详情', name: 'OrderStatDetailsDetail' }
      ],
      keepAlive: false
    }
  },
  /** ----- 订单统计 -> 订单日统计 ----- **/
  {
    path: '/order-stat-day',
    name: 'OrderStatDay',
    component: () => import('@/views/order/stat/day/index.vue'),
    meta: { 
      class1: 'order',
      class2: 'stat',
      class3: 'day',
      classList: ['order', 'stat', 'day'],
      breadcrumb: [
        { title: '订单中心', name: '' },
        { title: '订单统计', name: '' },
        { title: '订单日统计', name: 'OrderStatDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 订单统计 -> 订单月统计 ----- **/
  {
    path: '/order-stat-month',
    name: 'OrderStatMonth',
    component: () => import('@/views/order/stat/month/index.vue'),
    meta: {
      class1: 'order',
      class2: 'stat',
      class3: 'month',
      classList: ['order', 'stat', 'month'],
      breadcrumb: [
        { title: '订单中心', name: '' },
        { title: '订单统计', name: '' },
        { title: '订单月统计', name: 'OrderStatMonth' }
      ],
      keepAlive: true
    }
  },
]