'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
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
  SPACE_10,
  SPACE_12,
  SPACE_16,
  SPACE_20,
  RADIUS_LG,
  RADIUS_PILL,
  BREAKPOINT_MOBILE,
} from '@/styles/tokens'
import { FONT_DISPLAY, FONT_BODY, FONT_ACCENT } from '@/styles/typography'
import type { MenuCategory, MenuItem, MenuData } from '@/features/landing/types'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

const CARD_HEIGHT = '430px'
const SCROLL_AMOUNT = 360

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

const TabBar = styled.div`
  display: flex;
  gap: ${SPACE_2};
  animation: ${fadeIn} 600ms ease 200ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Tab = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? COLOR_WALNUT : 'transparent')};
  color: ${({ isActive }) => (isActive ? COLOR_WHITE : COLOR_YEHI_GREY)};
  border: 1px solid ${({ isActive }) => (isActive ? COLOR_WALNUT : 'rgba(235, 203, 203, 0.5)')};
  border-radius: ${RADIUS_PILL};
  padding: ${SPACE_2} ${SPACE_6};
  font-family: ${FONT_BODY};
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    border-color: ${COLOR_WALNUT};
    color: ${({ isActive }) => (isActive ? COLOR_WHITE : COLOR_WALNUT)};
  }
`

const CarouselOuter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${SPACE_3};
  min-height: 0;
  animation: ${fadeIn} 500ms ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CarouselWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  min-height: 0;
`

const CarouselArrow = styled.button`
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(74, 55, 40, 0.2);
  background: rgba(255, 255, 255, 0.9);
  color: ${COLOR_WALNUT};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 180ms ease;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: ${COLOR_WALNUT};
    color: ${COLOR_WHITE};
    border-color: ${COLOR_WALNUT};
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: none;
  }
`

const MenuGrid = styled.div<{ isDragging: boolean }>`
  display: flex;
  flex-direction: row;
  gap: ${SPACE_4};
  overflow-x: auto;
  scroll-snap-type: ${({ isDragging }) => (isDragging ? 'none' : 'x mandatory')};
  -webkit-overflow-scrolling: touch;
  height: ${CARD_HEIGHT};
  padding-bottom: ${SPACE_2};
  scroll-behavior: ${({ isDragging }) => (isDragging ? 'auto' : 'smooth')};
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  user-select: none;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    gap: ${SPACE_3};
    height: auto;
  }
`

const MenuCard = styled.div<{ isDragging: boolean }>`
  flex: 0 0 330px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(235, 203, 203, 0.4);
  border-radius: ${RADIUS_LG};
  padding: ${SPACE_6};
  display: flex;
  flex-direction: column;
  gap: ${SPACE_3};
  transition: all 200ms ease;
  backdrop-filter: blur(8px);
  scroll-snap-align: start;
  height: 100%;
  box-sizing: border-box;
  pointer-events: ${({ isDragging }) => (isDragging ? 'none' : 'auto')};

  &:hover {
    border-color: rgba(74, 55, 40, 0.25);
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    flex: 0 0 240px;
    height: 480px;
  }
`

const CardName = styled.div`
  font-family: ${FONT_DISPLAY};
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  font-weight: 600;
  color: ${COLOR_INK};
  letter-spacing: 0.02em;
`

const CardNameEn = styled.div`
  font-family: ${FONT_ACCENT};
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: ${COLOR_WALNUT_LIGHT};
  text-transform: uppercase;
`

const CardDesc = styled.div`
  font-family: ${FONT_BODY};
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${COLOR_YEHI_GREY};
`

const CardImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${RADIUS_LG};
  overflow: hidden;
  background: rgba(235, 203, 203, 0.15);
  flex-shrink: 0;
`

const CardPrice = styled.div`
  font-family: ${FONT_ACCENT};
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: ${COLOR_WALNUT};
  font-weight: 600;
`

function formatPrice(price: string): string {
  return Number(price).toLocaleString('ko-KR')
}

export function MenuSection() {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ startX: 0, scrollLeft: 0, active: false })

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data: MenuData) => {
        setMenuData(data)
        if (data.categories.length > 0) {
          setActiveCategory(data.categories[0].id)
        }
      })
  }, [])

  const updateScrollState = () => {
    const el = gridRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const raf = requestAnimationFrame(updateScrollState)
    el.addEventListener('scroll', updateScrollState)
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [activeCategory, menuData])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = gridRef.current
    if (!el) return
    dragState.current = { startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, active: true }
    setIsDragging(true)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return
    e.preventDefault()
    const el = gridRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = x - dragState.current.startX
    el.scrollLeft = dragState.current.scrollLeft - walk
  }, [])

  const onDragEnd = useCallback(() => {
    dragState.current.active = false
    setIsDragging(false)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = gridRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: 'smooth' })
  }

  if (!menuData || !activeCategory) return null

  const activeItems: MenuItem[] = menuData.items[activeCategory] ?? []

  return (
    <Section>
      <Header>
        <EyebrowText>Our Menu</EyebrowText>
        <Heading>예히당의 메뉴</Heading>
      </Header>

      <TabBar role="tablist">
        {menuData.categories.map((cat: MenuCategory) => (
          <Tab
            key={cat.id}
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            role="tab"
            aria-selected={activeCategory === cat.id}
          >
            {cat.label}
          </Tab>
        ))}
      </TabBar>

      <CarouselOuter>
        <CarouselArrow onClick={() => scroll('left')} disabled={!canScrollLeft} aria-label="이전">
          ‹
        </CarouselArrow>

        <CarouselWrapper>
          <MenuGrid
            ref={gridRef}
            key={activeCategory}
            role="tabpanel"
            isDragging={isDragging}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {activeItems.map((item: MenuItem) => (
              <MenuCard key={item.id} isDragging={isDragging}>
                <CardName>{item.name}</CardName>
                <CardNameEn>{item.nameEn}</CardNameEn>
                <CardDesc>{item.desc}</CardDesc>
                <CardImageWrap>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="330px"
                    />
                  )}
                </CardImageWrap>
                <CardPrice>₩ {formatPrice(item.price)}</CardPrice>
              </MenuCard>
            ))}
          </MenuGrid>
        </CarouselWrapper>

        <CarouselArrow onClick={() => scroll('right')} disabled={!canScrollRight} aria-label="다음">
          ›
        </CarouselArrow>
      </CarouselOuter>
    </Section>
  )
}
