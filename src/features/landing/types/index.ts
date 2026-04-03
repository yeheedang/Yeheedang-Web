import { SECTIONS } from '../constants/sections'

export type SectionId = typeof SECTIONS[number]['id']

export type TransitionState = 'idle' | 'entering' | 'exiting'

export interface SectionConfig {
  id: SectionId
  label: string
  labelKo: string
}

export interface MenuCategory {
  id: string
  label: string
}

export interface MenuItem {
  id: string
  name: string
  nameEn: string
  desc: string
  price: string
  image: string | null
}

export interface MenuData {
  categories: MenuCategory[]
  items: Record<string, MenuItem[]>
}
