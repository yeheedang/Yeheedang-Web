'use client'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useLandingStore } from '../store/useLandingStore'
import { sectionEnterStyle, sectionExitStyle, sectionIdleStyle } from '@/styles/animations'
import { Z_CONTENT } from '@/styles/tokens'

const TransitionWrapper = styled.div<{ transitionState: 'idle' | 'entering' | 'exiting' }>`
  position: absolute;
  inset: 0;
  z-index: ${Z_CONTENT};
  ${({ transitionState }) => {
    if (transitionState === 'entering') return sectionEnterStyle
    if (transitionState === 'exiting') return sectionExitStyle
    return sectionIdleStyle
  }}
`

export function SectionTransition({ children }: { children: React.ReactNode }) {
  const transitionState = useLandingStore((s) => s.transitionState)

  return (
    <TransitionWrapper transitionState={transitionState}>
      {children}
    </TransitionWrapper>
  )
}
