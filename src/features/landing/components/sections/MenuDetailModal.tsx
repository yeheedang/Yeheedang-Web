'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  COLOR_WALNUT,
  COLOR_INK,
  COLOR_YEHI_GREY,
  COLOR_WHITE,
  SPACE_2,
  SPACE_3,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  RADIUS_LG,
  BREAKPOINT_MOBILE,
} from '@/styles/tokens'
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from '@/styles/typography'
import type { MenuItem } from '@/features/landing/types'

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeInOverlay} 200ms ease both;
  padding: ${SPACE_8};

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    padding: 0;
    align-items: flex-end;
  }
`

const Modal = styled.div`
  background: ${COLOR_WHITE};
  border-radius: ${RADIUS_LG};
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  animation: ${slideUp} 250ms ease both;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    max-width: 100%;
    border-radius: ${RADIUS_LG} ${RADIUS_LG} 0 0;
  }
`

const ImageContainer = styled.div`
  position: relative;
`

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: rgba(235, 203, 203, 0.15);
  overflow: hidden;
`

const SlideArrow = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ side }) => side}: ${SPACE_3};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: ${COLOR_WHITE};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 180ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`

const DotRow = styled.div`
  position: absolute;
  bottom: ${SPACE_3};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${SPACE_2};
  z-index: 2;
`

const Dot = styled.button<{ isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${({ isActive }) => (isActive ? COLOR_WHITE : 'rgba(255,255,255,0.45)')};
  padding: 0;
  cursor: pointer;
  transition: background 200ms ease;
`

const CloseButton = styled.button`
  position: absolute;
  top: ${SPACE_4};
  right: ${SPACE_4};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: ${COLOR_WHITE};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 180ms ease;
  z-index: 3;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_3};
  padding: ${SPACE_6} ${SPACE_6} ${SPACE_8};
`

const Name = styled.h3`
  font-family: ${FONT_DISPLAY};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${COLOR_INK};
  letter-spacing: 0.02em;
  margin: 0;
`

const NameEn = styled.span`
  font-family: ${FONT_ACCENT};
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${COLOR_WALNUT};
`

const Price = styled.div`
  font-family: ${FONT_ACCENT};
  font-size: 1rem;
  letter-spacing: 0.05em;
  font-weight: 600;
  color: ${COLOR_WALNUT};
`

const Desc = styled.p`
  font-family: ${FONT_BODY};
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${COLOR_YEHI_GREY};
  margin: 0;
  padding-top: ${SPACE_4};
  border-top: 1px solid rgba(235, 203, 203, 0.4);
`

function formatPrice(price: string): string {
  return Number(price).toLocaleString('ko-KR')
}

function resolveImages(item: MenuItem): string[] {
  if (item.images && item.images.length > 0) return item.images
  if (item.image) return [item.image]
  return []
}

interface MenuDetailModalProps {
  item: MenuItem
  onClose: () => void
}

export function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  const images = resolveImages(item)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [item.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, images.length])

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [images.length])

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ImageContainer>
          <ImageWrap>
            {images[currentIndex] && (
              <Image
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`${item.name} ${currentIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="420px"
              />
            )}
            {images.length === 0 && null}
          </ImageWrap>

          {images.length > 1 && (
            <>
              <SlideArrow side="left" onClick={prev} aria-label="이전 사진">
                ‹
              </SlideArrow>
              <SlideArrow side="right" onClick={next} aria-label="다음 사진">
                ›
              </SlideArrow>
              <DotRow>
                {images.map((_, i) => (
                  <Dot key={i} isActive={i === currentIndex} onClick={() => setCurrentIndex(i)} aria-label={`사진 ${i + 1}`} />
                ))}
              </DotRow>
            </>
          )}

          <CloseButton onClick={onClose} aria-label="닫기">
            ✕
          </CloseButton>
        </ImageContainer>

        <Body>
          <Name>{item.name}</Name>
          <NameEn>{item.nameEn}</NameEn>
          <Price>₩ {formatPrice(item.price)}</Price>
          {item.desc && <Desc>{item.desc}</Desc>}
        </Body>
      </Modal>
    </Overlay>
  )
}
