'use client'

import { useEffect, useRef } from 'react'
import { SECTIONS } from '../constants/sections'
import { useLandingStore } from '../store/useLandingStore'
import type { SectionId } from '../types'

const SCROLL_COOLDOWN_MS = 800
const WHEEL_THRESHOLD = 30
const SWIPE_THRESHOLD = 50

export function useScrollNavigation() {
  const { activeSection, isTransitioning, navigateTo } = useLandingStore()
  const lastScrollTime = useRef(0)
  const touchStartY = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id as SectionId)

    const tryNavigate = (direction: 'up' | 'down') => {
      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_COOLDOWN_MS) return
      if (isTransitioning) return

      const currentIndex = sectionIds.indexOf(activeSection)
      const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1

      if (nextIndex < 0 || nextIndex >= sectionIds.length) return

      lastScrollTime.current = now
      navigateTo(sectionIds[nextIndex])
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      tryNavigate(e.deltaY > 0 ? 'down' : 'up')
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || touchStartX.current === null) return

      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX

      touchStartY.current = null
      touchStartX.current = null

      if (Math.abs(deltaX) > Math.abs(deltaY)) return
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return

      tryNavigate(deltaY > 0 ? 'down' : 'up')
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, isTransitioning, navigateTo])
}
