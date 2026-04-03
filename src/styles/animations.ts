import { keyframes, css } from '@emotion/react'
import { TRANSITION_DURATION, TRANSITION_EASING } from './tokens'

const HALF_DURATION = '300ms'

export const sectionEnterKeyframes = keyframes`
  from {
    opacity: 0;
    transform: scale(1.06);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const sectionExitKeyframes = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.06);
  }
`

export const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

export const slideInFromRightKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const sectionEnterStyle = css`
  animation: ${sectionEnterKeyframes} ${HALF_DURATION} ${TRANSITION_EASING} forwards;
  will-change: transform, opacity;
`

export const sectionExitStyle = css`
  animation: ${sectionExitKeyframes} ${HALF_DURATION} ${TRANSITION_EASING} forwards;
  will-change: transform, opacity;
`

export const sectionIdleStyle = css`
  opacity: 1;
  transform: scale(1);
`
