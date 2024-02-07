import { Component } from 'vue'

interface NavItemInter {
  label: string
  key: string
  icon: Component
}
type NavListType = NavItemInter[]

interface SidebarItem2Inter {
  label: string
  key: string
  url: string
}
type SubSidebarListType = SidebarItem2Inter[]

interface SidebarItemInter {
  label: string
  key: string
  list: SubSidebarListType
}
type SidebarListType = SidebarItemInter[]

interface SidebarDataInter {
  medical: SidebarListType
  order: SidebarListType
  finance: SidebarListType
  system: SidebarListType
  [key: string]: SidebarListType
}

export { 
  NavListType, 
  SubSidebarListType, 
  SidebarListType,
  SidebarItemInter,
  SidebarDataInter
}