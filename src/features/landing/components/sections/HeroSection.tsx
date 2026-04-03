'use client'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  COLOR_WALNUT,
  COLOR_YEHI_GREY,
  COLOR_INK,
  COLOR_WALNUT_LIGHT,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  SPACE_12,
  SPACE_16,
  BREAKPOINT_MOBILE,
} from '@/styles/tokens'
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from '@/styles/typography'
import { useLandingStore } from '../../store/useLandingStore'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${SPACE_16} ${SPACE_16} ${SPACE_16} clamp(${SPACE_12}, 8vw, ${SPACE_16});
  position: relative;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    align-items: center;
    text-align: center;
    padding: 80px ${SPACE_8} ${SPACE_8};
  }
`

const EyebrowText = styled.span`
  font-family: ${FONT_ACCENT};
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
  display: block;
  margin-bottom: ${SPACE_6};
  animation: ${fadeUp} 600ms ease 100ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const BrandName = styled.h1`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${COLOR_INK};
  margin: 0 0 ${SPACE_4} 0;
  animation: ${fadeUp} 700ms ease 200ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const BrandSubtitle = styled.p`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  color: ${COLOR_YEHI_GREY};
  margin: 0 0 ${SPACE_12} 0;
  animation: ${fadeUp} 700ms ease 350ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background-color: ${COLOR_WALNUT_LIGHT};
  margin-bottom: ${SPACE_8};
  animation: ${fadeUp} 600ms ease 450ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Tagline = styled.p`
  font-family: ${FONT_BODY};
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  line-height: 1.9;
  color: ${COLOR_YEHI_GREY};
  max-width: 360px;
  margin: 0 0 ${SPACE_12} 0;
  animation: ${fadeUp} 600ms ease 550ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ScrollCta = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${SPACE_4};
  font-family: ${FONT_ACCENT};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
  padding: 0;
  transition: gap 200ms ease;
  animation: ${fadeUp} 600ms ease 700ms both;

  &:hover {
    gap: ${SPACE_6};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ArrowLine = styled.span`
  display: block;
  width: 32px;
  height: 1px;
  background-color: ${COLOR_WALNUT};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 7px;
    height: 7px;
    border-right: 1px solid ${COLOR_WALNUT};
    border-top: 1px solid ${COLOR_WALNUT};
    transform: rotate(45deg);
  }
`

const DecoCorner = styled.div`
  position: absolute;
  bottom: clamp(${SPACE_8}, 6vw, ${SPACE_16});
  right: clamp(${SPACE_16}, 10vw, 140px);
  font-family: ${FONT_ACCENT};
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 300;
  color: rgba(74, 55, 40, 0.06);
  letter-spacing: -0.05em;
  line-height: 1;
  user-select: none;
  pointer-events: none;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: none;
  }
`

export function HeroSection() {
  const navigateTo = useLandingStore((s) => s.navigateTo)

  return (
    <Section>
      <EyebrowText>Korean Traditional Dessert Café</EyebrowText>
      <BrandName>예히당</BrandName>
      <BrandSubtitle>禮喜堂</BrandSubtitle>
      <Divider />
      <Tagline>
        전통의 맛과 현대의 감성이 만나는 곳.<br />
        정성껏 만든 한과와 음료로<br />
        당신의 하루를 채워드립니다.
      </Tagline>
      <ScrollCta onClick={() => navigateTo('about')}>
        예히당 알아보기
        <ArrowLine />
      </ScrollCta>
      <DecoCorner>禮</DecoCorner>
    </Section>
  )
}
