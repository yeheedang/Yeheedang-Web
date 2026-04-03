'use client'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  COLOR_WALNUT,
  COLOR_WALNUT_LIGHT,
  COLOR_YEHI_GREY,
  COLOR_INK,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  SPACE_10,
  SPACE_12,
  SPACE_16,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
} from '@/styles/tokens'
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from '@/styles/typography'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: ${SPACE_16} clamp(${SPACE_12}, 8vw, ${SPACE_16});
  gap: ${SPACE_16};

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    grid-template-columns: 1fr;
    gap: ${SPACE_8};
    padding: ${SPACE_12} ${SPACE_8};
    overflow-y: auto;
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    padding: ${SPACE_10} ${SPACE_8};
    text-align: center;
    align-content: center;
  }
`

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_6};
  animation: ${fadeIn} 600ms ease 100ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const EyebrowText = styled.span`
  font-family: ${FONT_ACCENT};
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
`

const Heading = styled.h2`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: ${COLOR_INK};
  margin: 0;
`

const BodyText = styled.p`
  font-family: ${FONT_BODY};
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  line-height: 2;
  color: ${COLOR_YEHI_GREY};
  margin: 0;
  max-width: 480px;
`

const ValuesList = styled.ul`
  list-style: none;
  margin: ${SPACE_4} 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const ValueItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${SPACE_4};
  font-family: ${FONT_BODY};
  font-size: 0.85rem;
  color: ${COLOR_YEHI_GREY};
  line-height: 1.6;

  &::before {
    content: '◦';
    color: ${COLOR_WALNUT};
    font-size: 0.7rem;
    margin-top: 3px;
    flex-shrink: 0;
  }
`

const DecoColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${fadeIn} 700ms ease 250ms both;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const DecoFrame = styled.div`
  position: relative;
  width: min(320px, 100%);
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(74, 55, 40, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: 12px;
    border: 1px solid rgba(74, 55, 40, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1px solid rgba(235, 203, 203, 0.4);
  }
`

const DecoCharacter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_DISPLAY};
  font-size: clamp(5rem, 10vw, 8rem);
  font-weight: 300;
  color: rgba(74, 55, 40, 0.12);
  letter-spacing: -0.05em;
  user-select: none;
`

const DecoSubText = styled.div`
  position: absolute;
  bottom: ${SPACE_8};
  left: 50%;
  transform: translateX(-50%);
  font-family: ${FONT_ACCENT};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT_LIGHT};
  white-space: nowrap;
`

export function AboutSection() {
  return (
    <Section>
      <TextColumn>
        <EyebrowText>Our Story</EyebrowText>
        <Heading>
          예(禮)와 희(喜)가<br />
          만나는 자리
        </Heading>
        <BodyText>
          예히당은 예의와 기쁨이 공존하는 공간입니다.
          한국의 전통 디저트를 현대적 감각으로 재해석하여,
          계절의 맛과 정성이 담긴 한과를 선보입니다.
        </BodyText>
        <BodyText>
          오랜 전통 조리법을 바탕으로, 국내산 재료만을 엄선하여
          하나하나 손으로 빚어 만드는 예히당만의 이야기를 담았습니다.
        </BodyText>
        <ValuesList>
          <ValueItem>국내산 재료만을 엄선하여 사용합니다</ValueItem>
          <ValueItem>전통 조리법을 현대적으로 재해석합니다</ValueItem>
          <ValueItem>계절마다 새로운 메뉴를 선보입니다</ValueItem>
        </ValuesList>
      </TextColumn>

      <DecoColumn>
        <DecoFrame>
          <DecoCharacter>禮喜</DecoCharacter>
          <DecoSubText>Since 2024</DecoSubText>
        </DecoFrame>
      </DecoColumn>
    </Section>
  )
}
