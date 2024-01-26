import { RouteRecordRaw } from 'vue-router'

interface Breadcrumb {
  title: string
  name: string
}

interface Meta {
  classList: string[]
  breadcrumb?: Breadcrumb[]
  keepAlive: Boolean
}

interface RouteItem {
  name?: string
  path: string
  redirect?: string
  meta?: Meta,
  children?: RoutesType
}

type RouteType = RouteRecordRaw & RouteItem

type RoutesType = Array<RouteType>

/** 前端导入的路由模块 */
type RouteModule = Record<string, { default: RouteType }>