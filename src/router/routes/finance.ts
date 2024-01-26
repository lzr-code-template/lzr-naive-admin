export default [
  /** ----- 医院财务 -> 医院日收入 ----- **/
  {
    path: '/finance-hospital-day',
    name: 'FinanceHospitalDay',
    component: () => import('@/views/finance/hospital/day/index.vue'),
    meta: { 
      classList: ['finance', 'hospital', 'day'],
      breadcrumb: [
        { title: '医务中心', name: '' },
        { title: '医院财务', name: '' }, 
        { title: '医院日收入', name: 'FinanceHospitalDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医院财务 -> 医院月收入 ----- **/
  {
    path: '/finance-hospital-month',
    name: 'FinanceHospitalMonth',
    component: () => import('@/views/finance/hospital/month/index.vue'),
    meta: {
      classList: ['finance', 'hospital', 'month'],
      breadcrumb: [
        { title: '医务中心', name: '' },
        { title: '医院财务', name: '' },
        { title: '医院月收入', name: 'FinanceHospitalMonth' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医生财务 -> 医生日收入 ----- **/
  {
    path: '/finance-doctor-day',
    name: 'FinanceDoctorDay',
    component: () => import('@/views/finance/doctor/day/index.vue'),
    meta: { 
      classList: ['finance', 'doctor', 'day'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '医生财务', name: '' }, 
        { title: '医生日收入', name: 'FinanceDoctorDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医生财务 -> 医生月收入 ----- **/
  {
    path: '/finance-doctor-month',
    name: 'FinanceDoctorMonth',
    component: () => import('@/views/finance/doctor/month/index.vue'),
    meta: {
      classList: ['finance', 'doctor', 'month'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '医生财务', name: '' }, 
        { title: '医生月收入', name: 'FinanceDoctorMonth' }
      ],
      keepAlive: true
    }
  },
  /** ----- 平台财务 -> 平台日收入 ----- **/
  {
    path: '/finance-platform-day',
    name: 'FinancePlatformDay',
    component: () => import('@/views/finance/platform/day/index.vue'),
    meta: { 
      classList: ['finance', 'platform', 'day'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '平台财务', name: '' }, 
        { title: '平台日收入', name: 'FinancePlatformDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 平台财务 -> 平台月收入 ----- **/
  {
    path: '/finance-platform-month',
    name: 'FinancePlatformMonth',
    component: () => import('@/views/finance/platform/month/index.vue'),
    meta: {
      classList: ['finance', 'platform', 'month'],
      breadcrumb: [
        { title: '医务中心', name: '' },
        { title: '平台财务', name: '' },
        { title: '平台日收入', name: 'FinancePlatformMonth' }
      ],
      keepAlive: true
    }
  },
]