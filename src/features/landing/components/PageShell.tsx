'use client'

import styled from '@emotion/styled'
import { COLOR_HANJI_PAPER, NAV_WIDTH_PC, OPACITY_TEXTURE, Z_BACKGROUND, BREAKPOINT_MOBILE } from '@/styles/tokens'

export const PageShell = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${COLOR_HANJI_PAPER};
  padding-right: ${NAV_WIDTH_PC};

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    padding-right: 0;
  }

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: ${Z_BACKGROUND};
    pointer-events: none;
    opacity: ${OPACITY_TEXTURE};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 300px 300px;
  }
`
