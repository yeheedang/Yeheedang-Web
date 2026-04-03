'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import type { MenuData, MenuItem, MenuCategory } from '../types'

export function useMenuAdmin() {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMenu = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get<MenuData>('/api/admin/menu')
      setMenuData(data)
    } catch {
      setError('메뉴 데이터를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveMenu = useCallback(async (data: MenuData) => {
    setSaving(true)
    setError(null)
    try {
      await axios.put('/api/admin/menu', data)
      setMenuData(data)
      return true
    } catch {
      setError('저장에 실패했습니다.')
      return false
    } finally {
      setSaving(false)
    }
  }, [])

  const addCategory = useCallback((category: MenuCategory) => {
    setMenuData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        categories: [...prev.categories, category],
        items: { ...prev.items, [category.id]: [] },
      }
    })
  }, [])

  const removeCategory = useCallback((categoryId: string) => {
    setMenuData((prev) => {
      if (!prev) return prev
      const { [categoryId]: _removed, ...remainingItems } = prev.items
      return {
        ...prev,
        categories: prev.categories.filter((c) => c.id !== categoryId),
        items: remainingItems,
      }
    })
  }, [])

  const addItem = useCallback((categoryId: string, item: MenuItem) => {
    setMenuData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: [...(prev.items[categoryId] ?? []), item],
        },
      }
    })
  }, [])

  const updateItem = useCallback((categoryId: string, updatedItem: MenuItem) => {
    setMenuData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: prev.items[categoryId].map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        },
      }
    })
  }, [])

  const removeItem = useCallback((categoryId: string, itemId: string) => {
    setMenuData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        items: {
          ...prev.items,
          [categoryId]: prev.items[categoryId].filter((item) => item.id !== itemId),
        },
      }
    })
  }, [])

  return {
    menuData,
    loading,
    saving,
    error,
    fetchMenu,
    saveMenu,
    addCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
  }
}
