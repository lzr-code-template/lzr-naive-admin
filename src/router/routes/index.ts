import type { RouteModule, RouteType, RoutesType } from '@/types/router.ts'
import Layout from '@/components/Layout/index.vue'
import ErrorPage from '@/views/error-page/404.vue'
import medical from './medical'
import order from './order'
import finance from './finance'
import system from './system'

export const basicRoutes: RoutesType = [
  {
    path: '/',
    redirect: '/main',
  },
  /** ----- 登录页 ----- **/
  {
    path: '/account/login',
    name: 'Login',
    component:() => import('@/views/account/login/index.vue')
  },
  /** ----- 后台内容 ----- **/
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    meta: {
      class1: 'main',
      class2: 'home',
      class3: 'index',
      classList: ['main', 'home', 'index'],
      breadcrumb: [{ title: '', name: '' }],
      keepAlive: false
    },
    children: [
      /** ----- 首页 ----- **/
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
      /** --- 医务中心 --- **/
      ...medical,
      /** --- 订单中心 --- **/
      ...order,
      /** --- 财务中心 --- **/
      ...finance,
      /** --- 系统管理 --- **/
      ...system,
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:() => ErrorPage
  }
]

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }