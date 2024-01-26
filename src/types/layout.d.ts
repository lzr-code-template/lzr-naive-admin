import { Component } from 'vue';

interface NavItem {
  label: string;
  key: string;
  icon: Component;
}

type NavListType = NavItem[];

export { NavListType }