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
  images?: string[]
}

export interface MenuData {
  categories: MenuCategory[]
  items: Record<string, MenuItem[]>
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface GalleryData {
  images: GalleryImage[]
}
