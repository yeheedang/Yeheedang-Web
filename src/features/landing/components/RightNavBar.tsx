'use client'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  COLOR_WALNUT,
  COLOR_WALNUT_DARK,
  COLOR_YEHI_GREY,
  NAV_WIDTH_PC,
  SPACE_2,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  Z_NAV,
  BREAKPOINT_MOBILE,
} from '@/styles/tokens'
import { FONT_BODY, FONT_DISPLAY } from '@/styles/typography'
import { SECTIONS } from '../constants/sections'
import { useLandingStore } from '../store/useLandingStore'
import { NavItem } from './NavItem'
import type { SectionId } from '../types'

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: ${NAV_WIDTH_PC};
  height: 100vh;
  z-index: ${Z_NAV};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0 ${SPACE_6};
  gap: ${SPACE_8};
  background: rgba(250, 246, 240, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-left: 1px solid rgba(235, 203, 203, 0.3);

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: none;
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const MobileNavOverlay = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: ${Z_NAV};
    background: rgba(250, 246, 240, 0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${SPACE_8};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    transition: opacity 300ms ease;
  }
`

const MobileNavItem = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${FONT_DISPLAY};
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  color: ${({ isActive }) => (isActive ? COLOR_WALNUT : COLOR_YEHI_GREY)};
  transition: color 200ms ease;
  padding: ${SPACE_4} 0;

  &:hover {
    color: ${COLOR_WALNUT};
  }
`

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: flex;
    position: fixed;
    top: ${SPACE_6};
    right: ${SPACE_6};
    z-index: ${Z_NAV + 1};
    background: none;
    border: none;
    cursor: pointer;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    padding: ${SPACE_2};
  }
`

const HamburgerLine = styled.span<{ isOpen: boolean; position: 'top' | 'mid' | 'bot' }>`
  display: block;
  width: 22px;
  height: 1px;
  background-color: ${COLOR_WALNUT_DARK};
  transition: all 250ms ease;

  ${({ isOpen, position }) => {
    if (!isOpen) return ''
    if (position === 'top') return 'transform: translateY(6px) rotate(45deg);'
    if (position === 'mid') return 'opacity: 0; transform: scaleX(0);'
    if (position === 'bot') return 'transform: translateY(-6px) rotate(-45deg);'
    return ''
  }}
`

export function RightNavBar() {
  const { activeSection, isTransitioning, isMobileNavOpen, navigateTo, setMobileNavOpen } =
    useLandingStore()

  return (
    <>
      {/* PC 우측 네비 */}
      <NavBar aria-label="페이지 네비게이션">
        {SECTIONS.map((section) => (
          <NavItem
            key={section.id}
            id={section.id as SectionId}
            labelKo={section.labelKo}
            isActive={activeSection === section.id}
            isDisabled={isTransitioning}
            onClick={navigateTo}
          />
        ))}
      </NavBar>

      {/* 모바일 햄버거 버튼 */}
      <HamburgerButton
        isOpen={isMobileNavOpen}
        onClick={() => setMobileNavOpen(!isMobileNavOpen)}
        aria-label={isMobileNavOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isMobileNavOpen}
      >
        <HamburgerLine isOpen={isMobileNavOpen} position="top" />
        <HamburgerLine isOpen={isMobileNavOpen} position="mid" />
        <HamburgerLine isOpen={isMobileNavOpen} position="bot" />
      </HamburgerButton>

      {/* 모바일 오버레이 네비 */}
      <MobileNavOverlay isOpen={isMobileNavOpen} aria-hidden={!isMobileNavOpen}>
        {SECTIONS.map((section) => (
          <MobileNavItem
            key={section.id}
            isActive={activeSection === section.id}
            onClick={() => navigateTo(section.id as SectionId)}
          >
            {section.labelKo}
          </MobileNavItem>
        ))}
      </MobileNavOverlay>
    </>
  )
}
