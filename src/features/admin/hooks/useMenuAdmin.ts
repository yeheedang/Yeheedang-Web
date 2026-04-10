'use client'

import { useState, useCallback, useRef } from 'react'
import axios from 'axios'
import type { MenuData, MenuItem, MenuCategory } from '../types'

export function useMenuAdmin() {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const menuDataRef = useRef<MenuData | null>(null)

  const fetchMenu = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get<MenuData>('/api/admin/menu')
      setMenuData(data)
      menuDataRef.current = data
    } catch {
      setError('메뉴 데이터를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  const persistMenu = useCallback(async (data: MenuData) => {
    setSaving(true)
    setError(null)
    try {
      await axios.put('/api/admin/menu', data)
      setSavedAt(new Date())
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }, [])

  const addCategory = useCallback((category: MenuCategory) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        categories: [...prev.categories, category],
        items: { ...prev.items, [category.id]: [] },
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const removeCategory = useCallback((categoryId: string) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const { [categoryId]: _removed, ...remainingItems } = prev.items
      const next = {
        ...prev,
        categories: prev.categories.filter((c) => c.id !== categoryId),
        items: remainingItems,
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const addItem = useCallback((categoryId: string, item: MenuItem) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: [...(prev.items[categoryId] ?? []), item],
        },
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const updateItem = useCallback((categoryId: string, updatedItem: MenuItem) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: prev.items[categoryId].map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        },
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const removeItem = useCallback((categoryId: string, itemId: string) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: prev.items[categoryId].filter((item) => item.id !== itemId),
        },
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const reorderItems = useCallback((categoryId: string, reorderedItems: MenuItem[]) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: reorderedItems,
        },
      }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  const reorderCategories = useCallback((reorderedCategories: MenuCategory[]) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const next = { ...prev, categories: reorderedCategories }
      menuDataRef.current = next
      persistMenu(next)
      return next
    })
  }, [persistMenu])

  return {
    menuData,
    loading,
    saving,
    savedAt,
    error,
    fetchMenu,
    addCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
    reorderItems,
    reorderCategories,
  }
}
