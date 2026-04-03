'use client'

import { useEffect, useRef } from 'react'
import { SECTIONS } from '../constants/sections'
import { useLandingStore } from '../store/useLandingStore'
import type { SectionId } from '../types'

const SCROLL_COOLDOWN_MS = 800
const WHEEL_THRESHOLD = 30

export function useScrollNavigation() {
  const { activeSection, isTransitioning, navigateTo } = useLandingStore()
  const lastScrollTime = useRef(0)

  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id as SectionId)

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return

      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_COOLDOWN_MS) return
      if (isTransitioning) return

      const currentIndex = sectionIds.indexOf(activeSection)
      const nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1

      if (nextIndex < 0 || nextIndex >= sectionIds.length) return

      lastScrollTime.current = now
      navigateTo(sectionIds[nextIndex])
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeSection, isTransitioning, navigateTo])
}
