'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import {
  COLOR_WALNUT,
  COLOR_WALNUT_LIGHT,
  COLOR_YEHI_GREY,
  COLOR_INK,
  COLOR_WHITE,
  SPACE_2,
  SPACE_3,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  SPACE_12,
  SPACE_16,
  SPACE_20,
  RADIUS_LG,
  RADIUS_PILL,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
} from '@/styles/tokens'
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from '@/styles/typography'
import type { GalleryData, GalleryImage } from '@/features/landing/types'

const SLIDE_DURATION_MS = 500

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${SPACE_12} clamp(${SPACE_16}, 8vw, ${SPACE_20});
  gap: ${SPACE_8};

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    padding: 80px ${SPACE_8} ${SPACE_8};
    overflow-y: auto;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_3};
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
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: ${COLOR_INK};
  margin: 0;
`

const SliderArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${SPACE_4};
  min-height: 0;
  animation: ${fadeIn} 500ms ease 200ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ArrowButton = styled.button`
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(89, 89, 89, 0.2);
  background: rgba(255, 255, 255, 0.9);
  color: ${COLOR_WALNUT};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all 180ms ease;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;

  &:hover {
    background: ${COLOR_WALNUT};
    color: ${COLOR_WHITE};
    border-color: ${COLOR_WALNUT};
  }

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: none;
  }
`

const SlideContainer = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const ImageWrap = styled.div<{ direction: 'left' | 'right' | null }>`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  border-radius: ${RADIUS_LG};
  overflow: hidden;
  background: rgba(235, 203, 203, 0.1);

  ${({ direction }) =>
    direction === 'right' &&
    css`
      animation: ${slideInFromRight} ${SLIDE_DURATION_MS}ms ease both;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      animation: ${slideInFromLeft} ${SLIDE_DURATION_MS}ms ease both;
    `}

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    aspect-ratio: 4 / 3;
    flex: none;
  }
`

const CaptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    flex-direction: column;
    align-items: center;
    gap: ${SPACE_3};
  }
`

const Caption = styled.p`
  font-family: ${FONT_BODY};
  font-size: 0.85rem;
  color: ${COLOR_YEHI_GREY};
  margin: 0;
  letter-spacing: 0.03em;
`

const DotsRow = styled.div`
  display: flex;
  gap: ${SPACE_2};
  align-items: center;
`

const Dot = styled.button<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '20px' : '6px')};
  height: 6px;
  border-radius: ${RADIUS_PILL};
  border: none;
  background: ${({ isActive }) => (isActive ? COLOR_WALNUT : 'rgba(89,89,89,0.25)')};
  cursor: pointer;
  transition: all 300ms ease;
  padding: 0;

  &:hover {
    background: ${COLOR_WALNUT};
  }
`

const CounterText = styled.span`
  font-family: ${FONT_ACCENT};
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: ${COLOR_WALNUT_LIGHT};
`

const MobileSwipeHint = styled.p`
  display: none;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: block;
    font-family: ${FONT_ACCENT};
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: rgba(89, 89, 89, 0.4);
    text-align: center;
    margin: 0;
  }
`

const SWIPE_THRESHOLD = 50

export function GallerySection() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data: GalleryData) => setGalleryData(data))
  }, [])

  const goTo = useCallback(
    (index: number, direction: 'left' | 'right') => {
      if (isAnimating || !galleryData) return
      setIsAnimating(true)
      setSlideDirection(direction)
      setCurrentIndex(index)
      setTimeout(() => {
        setIsAnimating(false)
        setSlideDirection(null)
      }, SLIDE_DURATION_MS)
    },
    [isAnimating, galleryData],
  )

  const goPrev = useCallback(() => {
    if (!galleryData) return
    const prevIndex = (currentIndex - 1 + galleryData.images.length) % galleryData.images.length
    goTo(prevIndex, 'left')
  }, [currentIndex, galleryData, goTo])

  const goNext = useCallback(() => {
    if (!galleryData) return
    const nextIndex = (currentIndex + 1) % galleryData.images.length
    goTo(nextIndex, 'right')
  }, [currentIndex, galleryData, goTo])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      diff > 0 ? goNext() : goPrev()
    }
    setTouchStart(null)
  }

  if (!galleryData || galleryData.images.length === 0) return null

  const images = galleryData.images
  const current: GalleryImage = images[currentIndex]
  const total = images.length

  return (
    <Section>
      <Header>
        <EyebrowText>Gallery</EyebrowText>
        <Heading>갤러리</Heading>
      </Header>

      <SliderArea>
        <ArrowButton onClick={goPrev} disabled={total <= 1} aria-label="이전 이미지">
          ‹
        </ArrowButton>

        <SlideContainer>
          <ImageWrap
            key={current.id}
            direction={slideDirection}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </ImageWrap>

          <CaptionRow>
            {current.caption ? (
              <Caption>{current.caption}</Caption>
            ) : (
              <span />
            )}

            <DotsRow aria-label="슬라이드 인디케이터">
              {images.map((img, i) => (
                <Dot
                  key={img.id}
                  isActive={i === currentIndex}
                  onClick={() => goTo(i, i > currentIndex ? 'right' : 'left')}
                  aria-label={`${i + 1}번째 이미지`}
                  aria-current={i === currentIndex}
                />
              ))}
            </DotsRow>

            <CounterText>
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </CounterText>
          </CaptionRow>

          <MobileSwipeHint>swipe to navigate</MobileSwipeHint>
        </SlideContainer>

        <ArrowButton onClick={goNext} disabled={total <= 1} aria-label="다음 이미지">
          ›
        </ArrowButton>
      </SliderArea>
    </Section>
  )
}
