import { RouteRecordRaw } from 'vue-router'

interface BreadcrumbInter {
  title: string
  name: string
}

interface Meta {
  class1: string
  class2: string
  class3: string
  classList: string[]
  breadcrumb?: BreadcrumbInter[]
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

export { 
  BreadcrumbInter,
  RouteModule, 
  RouteType, 
  RoutesType
}