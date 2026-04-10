'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
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
  cursor: grab;

  &:active {
    cursor: grabbing;
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

const AUTOPLAY_INTERVAL = 4000
const DRAG_THRESHOLD = 50

export function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  const images = resolveImages(item)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [item.id])

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (images.length > 1) {
      autoplayRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    }
  }, [images.length, next])

  useEffect(() => {
    resetAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [resetAutoplay])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') { prev(); resetAutoplay() }
      if (e.key === 'ArrowRight') { next(); resetAutoplay() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, prev, next, resetAutoplay])

  const handleDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX
    isDragging.current = false
  }, [])

  const handleDragEnd = useCallback((clientX: number) => {
    if (dragStartX.current === null) return
    const delta = dragStartX.current - clientX
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta > 0) next()
      else prev()
      resetAutoplay()
    }
    dragStartX.current = null
    isDragging.current = false
  }, [prev, next, resetAutoplay])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }, [handleDragStart])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true
    }
  }, [])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    handleDragEnd(e.clientX)
  }, [handleDragEnd])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }, [handleDragStart])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX)
  }, [handleDragEnd])

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ImageContainer>
          <ImageWrap
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { dragStartX.current = null }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {images[currentIndex] && (
              <Image
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`${item.name} ${currentIndex + 1}`}
                fill
                style={{ objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
                sizes="420px"
                draggable={false}
              />
            )}
            {images.length === 0 && null}
          </ImageWrap>

          {images.length > 1 && (
            <DotRow>
              {images.map((_, i) => (
                <Dot key={i} isActive={i === currentIndex} onClick={() => { setCurrentIndex(i); resetAutoplay() }} aria-label={`사진 ${i + 1}`} />
              ))}
            </DotRow>
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
