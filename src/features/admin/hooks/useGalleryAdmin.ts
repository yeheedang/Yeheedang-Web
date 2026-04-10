'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import type { GalleryData, GalleryImage } from '../types'

export function useGalleryAdmin() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const fetchGallery = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get<GalleryData>('/api/admin/gallery')
      setGalleryData(data)
    } catch {
      setError('갤러리 데이터를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  const persistGallery = useCallback(async (data: GalleryData) => {
    setSaving(true)
    setError(null)
    try {
      await axios.put('/api/admin/gallery', data)
      setSavedAt(new Date())
    } catch {
      setError('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }, [])

  const addImage = useCallback((image: GalleryImage) => {
    setGalleryData((prev) => {
      const next = prev ? { images: [...prev.images, image] } : { images: [image] }
      persistGallery(next)
      return next
    })
  }, [persistGallery])

  const updateImage = useCallback((updated: GalleryImage) => {
    setGalleryData((prev) => {
      if (!prev) return prev
      const next = { images: prev.images.map((img) => (img.id === updated.id ? updated : img)) }
      persistGallery(next)
      return next
    })
  }, [persistGallery])

  const removeImage = useCallback((id: string) => {
    setGalleryData((prev) => {
      if (!prev) return prev
      const next = { images: prev.images.filter((img) => img.id !== id) }
      persistGallery(next)
      return next
    })
  }, [persistGallery])

  const reorderImages = useCallback((images: GalleryImage[]) => {
    setGalleryData((prev) => {
      if (!prev) return prev
      const next = { images }
      persistGallery(next)
      return next
    })
  }, [persistGallery])

  return {
    galleryData,
    loading,
    saving,
    savedAt,
    error,
    fetchGallery,
    addImage,
    updateImage,
    removeImage,
    reorderImages,
  }
}
