import order from './order'
import user from './user'
import webset from './webset'
import system from './system'
import ErrorPage from '@/views/error-page/404.vue'
import Layout from '@/components/Layout/index.vue'
import type { RouteModule, RouteType, RoutesType } from '@/types/router.ts'

export const basicRoutes: RoutesType = [
  {
    path: '/',
    redirect: '/main',
  },
  /** ----- 登录页 ----- */
  {
    path: '/account/login',
    name: 'Login',
    component: () => import('@/views/account/login/index.vue'),
  },
  /** ----- 后台内容 ----- */
  {
    path: '/main',
    component: Layout,
    redirect: '/home',
    meta: {
      name: 'main',
      keepAlive: false,
    },
    children: [
      /** ----- 首页 ----- */
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          name: 'Home',
          keepAlive: false,
        },
      },
      /** --- 订单管理 --- */
      ...order,
      /** --- 用户管理 --- */
      ...user,
      /** --- 网站管理 --- */
      ...webset,
      /** --- 系统管理 --- */
      ...system,
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => ErrorPage,
  },
]

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }
