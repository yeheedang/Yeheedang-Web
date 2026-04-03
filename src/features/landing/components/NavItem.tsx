'use client'

import styled from '@emotion/styled'
import { COLOR_WALNUT, COLOR_YEHI_GREY, OPACITY_DISABLED, SPACE_2, SPACE_3 } from '@/styles/tokens'
import { FONT_BODY } from '@/styles/typography'
import type { SectionId } from '../types'

interface NavItemProps {
  id: SectionId
  labelKo: string
  isActive: boolean
  isDisabled: boolean
  onClick: (id: SectionId) => void
}

const ItemWrapper = styled.button<{ isActive: boolean; isDisabled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${SPACE_3};
  background: none;
  border: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? OPACITY_DISABLED : 1)};
  padding: ${SPACE_2} 0;
  transition: opacity 200ms ease;
  width: 100%;
  justify-content: flex-end;

  &:focus-visible {
    outline: 2px solid ${COLOR_WALNUT};
    outline-offset: 2px;
    border-radius: 2px;
  }

  &:hover .nav-label {
    opacity: 1;
    transform: rotate(0deg) translateY(0);
    color: ${COLOR_WALNUT};
  }

  &:hover .nav-dot {
    background-color: ${COLOR_WALNUT};
    width: 8px;
    height: 8px;
  }
`

const Label = styled.span<{ isActive: boolean }>`
  font-family: ${FONT_BODY};
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: ${({ isActive }) => (isActive ? COLOR_WALNUT : COLOR_YEHI_GREY)};
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transition: color 300ms ease, opacity 300ms ease, transform 300ms ease;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: ${({ isActive }) =>
    isActive ? 'rotate(0deg) translateY(0)' : 'rotate(0deg) translateY(4px)'};
`

const Dot = styled.span<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '10px' : '6px')};
  height: ${({ isActive }) => (isActive ? '10px' : '6px')};
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? COLOR_WALNUT : COLOR_YEHI_GREY)};
  transition: all 300ms ease;
  flex-shrink: 0;
`

export function NavItem({ id, labelKo, isActive, isDisabled, onClick }: NavItemProps) {
  return (
    <ItemWrapper
      isActive={isActive}
      isDisabled={isDisabled}
      disabled={isDisabled}
      onClick={() => onClick(id)}
      aria-current={isActive ? 'page' : undefined}
      aria-label={labelKo}
    >
      <Label isActive={isActive} className="nav-label">{labelKo}</Label>
      <Dot isActive={isActive} className="nav-dot" />
    </ItemWrapper>
  )
}
