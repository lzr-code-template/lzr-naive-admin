import type { RouteModule, RouteType, RoutesType } from '@/types/router.ts'
import Layout from '@/components/Layout/index.vue'
import ErrorPage from '@/views/error-page/404.vue'

export const basicRoutes: RoutesType = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    component: () => Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component:() => ErrorPage,
    meta: { name: 'NotFound' }
  }
]

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }