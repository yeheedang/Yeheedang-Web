import { create } from 'zustand'
import { TRANSITION_DURATION_MS } from '@/styles/tokens'
import type { SectionId, TransitionState } from '../types'

interface LandingState {
  activeSection: SectionId
  transitionState: TransitionState
  isTransitioning: boolean
  isMobileNavOpen: boolean
  navigateTo: (id: SectionId) => void
  setMobileNavOpen: (open: boolean) => void
}

export const useLandingStore = create<LandingState>((set, get) => ({
  activeSection: 'hero',
  transitionState: 'idle',
  isTransitioning: false,
  isMobileNavOpen: false,

  navigateTo: (id) => {
    const { isTransitioning, activeSection } = get()
    if (isTransitioning || activeSection === id) return

    const halfDuration = TRANSITION_DURATION_MS / 2

    set({ isTransitioning: true, transitionState: 'exiting' })

    setTimeout(() => {
      set({ activeSection: id, transitionState: 'entering', isMobileNavOpen: false })

      setTimeout(() => {
        set({ isTransitioning: false, transitionState: 'idle' })
      }, halfDuration)
    }, halfDuration)
  },

  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
}))
