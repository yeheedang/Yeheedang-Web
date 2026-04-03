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
    padding: 80px ${SPACE_8} ${SPACE_8};
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
  max-width: 495px;
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

const AwardsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const AwardItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${SPACE_4};
  font-family: ${FONT_BODY};
  font-size: 0.8rem;
  color: ${COLOR_YEHI_GREY};
  line-height: 1.5;

  &::before {
    content: '✦';
    color: ${COLOR_WALNUT};
    font-size: 0.55rem;
    margin-top: 4px;
    flex-shrink: 0;
  }
`

const AwardEyebrow = styled.span`
  font-family: ${FONT_ACCENT};
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
  display: block;
  margin-bottom: ${SPACE_4};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(74, 55, 40, 0.15);
  margin: 0;
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

const DecoCharacter = styled.img`
  position: absolute;
  inset: 0;
  width: 70%;
  height: auto;
  margin: auto;
  object-fit: contain;
  opacity: 0.15;
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
          모든 날, 모든 순간<br />
          예히당과 함께
        </Heading>
        <BodyText>
          예히당은 15년 요리강사 경력의 특제 레시피와 <br/>
          엄선한 국내산 재료로 만드는 답례품 전문 카페입니다.<br/>
          한국의 색을 담은 화과자와 함께 호두정과, 오란다, 양갱  등 <br/>
          다양한 전통 디저트를 담아냅니다.
        </BodyText>
        <BodyText>
          예히당을 찾는 모든 분들에게 행복하고 건강한 삶이 오래도록 이어지길 바라는 마음으로,
          어버이날·스승의날·추석·설날·생일·칠순·상견례·결혼식 답례품 등 소중한 모든 순간을 함께합니다.
        </BodyText>
        <Divider />
        <div>
          <AwardEyebrow>Awards</AwardEyebrow>
          <AwardsList>
            <AwardItem>2023 대한민국 국제요리&amp;제과경연대회 전시경연 대상</AwardItem>
            <AwardItem>2023 대한민국 국제요리&amp;제과경연대회 찬요리 대상</AwardItem>
            <AwardItem>경기도지사 · 문화체육관광부 장관상 수상</AwardItem>
            <AwardItem>2019 쌀요리경연대회 우수상</AwardItem>
          </AwardsList>
        </div>
      </TextColumn>

      <DecoColumn>
        <DecoFrame>
          <DecoCharacter src="/Logo.png" alt="예히당" />
          <DecoSubText>Since 2020</DecoSubText>
        </DecoFrame>
      </DecoColumn>
    </Section>
  )
}
