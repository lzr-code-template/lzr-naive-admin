export default [
  /** ----- 指南统计 -> 指南明细 ----- **/
  // ---- 列表 ----
  {
    path: '/medical-guide-details',
    name: 'MedicalGuideDetails',
    component: () => import('@/views/medical/guide/details/index.vue'),
    meta: {
      classList: ['medical', 'guide', 'details'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '指南统计', name: '' }, 
        { title: '指南明细', name: 'MedicalGuideDetails' }
      ],
      keepAlive: true
    }
  },
  // ---- 详情 ----
  {
    path: '/medical-guide-details/detail/:id',
    name: 'MedicalGuideDetailsDetail',
    component: () => import('@/views/medical/guide/details/detail.vue'),
    meta: { 
      classList: ['medical', 'guide', 'details'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '指南统计', name: '' }, 
        { title: '指南明细', name: 'MedicalGuideDetails' },
        { title: '指南详情', name: 'MedicalGuideDetailsDetail' }
      ],
      keepAlive: false
    }
  },
  /** ----- 医院统计 -> 医院日统计 ----- **/
  {
    path: '/medical-hospital-day',
    name: 'MedicalHospitalDay',
    component: () => import('@/views/medical/hospital/day/index.vue'),
    meta: { 
      classList: ['medical', 'hospital', 'day'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '医院统计', name: '' }, 
        { title: '医院日统计', name: 'MedicalHospitalDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医院统计 -> 医院月统计 ----- **/
  {
    path: '/medical-hospital-month',
    name: 'MedicalHospitalMonth',
    component: () => import('@/views/medical/hospital/month/index.vue'),
    meta: {
      classList: ['medical', 'hospital', 'month'],
      breadcrumb: [
        { title: '医务中心', name: '' },
        { title: '医院统计', name: '' },
        { title: '医院月统计', name: 'MedicalHospitalMonth' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医生统计 -> 医生日统计 ----- **/
  {
    path: '/medical-doctor-day',
    name: 'MedicalDoctorDay',
    component: () => import('@/views/medical/doctor/day/index.vue'),
    meta: { 
      classList: ['medical', 'doctor', 'day'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '医生统计', name: '' }, 
        { title: '医生日统计', name: 'MedicalDoctorDay' }
      ],
      keepAlive: true
    }
  },
  /** ----- 医生统计 -> 医生月统计 ----- **/
  {
    path: '/medical-doctor-month',
    name: 'MedicalDoctorMonth',
    component: () => import('@/views/medical/doctor/month/index.vue'),
    meta: {
      classList: ['medical', 'doctor', 'month'],
      breadcrumb: [
        { title: '医务中心', name: '' }, 
        { title: '医生统计', name: '' }, 
        { title: '医生月统计', name: 'MedicalDoctorMonth' }
      ],
      keepAlive: true
    }
  },
]