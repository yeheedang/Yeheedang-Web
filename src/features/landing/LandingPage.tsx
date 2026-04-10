'use client'

import { useLandingStore } from './store/useLandingStore'
import { PageShell } from './components/PageShell'
import { SectionTransition } from './components/SectionTransition'
import { RightNavBar } from './components/RightNavBar'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { MenuSection } from './components/sections/MenuSection'
import { GallerySection } from './components/sections/GallerySection'
import { ContactSection } from './components/sections/ContactSection'
import { useScrollNavigation } from './hooks/useScrollNavigation'
import type { SectionId } from './types'

const SECTION_MAP: Record<SectionId, React.ComponentType> = {
  hero: HeroSection,
  about: AboutSection,
  menu: MenuSection,
  gallery: GallerySection,
  contact: ContactSection,
}

export function LandingPage() {
  const activeSection = useLandingStore((s) => s.activeSection)
  const ActiveSection = SECTION_MAP[activeSection]

  useScrollNavigation()

  return (
    <PageShell>
      <SectionTransition>
        <ActiveSection />
      </SectionTransition>
      <RightNavBar />
    </PageShell>
  )
}
