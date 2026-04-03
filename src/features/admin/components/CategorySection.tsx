/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'
import type { MenuCategory, MenuItem } from '../types'
import { ItemFormModal } from './ItemFormModal'
import {
  COLOR_WALNUT,
  COLOR_WALNUT_DARK,
  COLOR_WALNUT_LIGHT,
  COLOR_YEHI_GREY,
  COLOR_WHITE,
  SPACE_2,
  SPACE_3,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  RADIUS_MD,
  RADIUS_LG,
} from '@/styles/tokens'

interface CategorySectionProps {
  category: MenuCategory
  items: MenuItem[]
  onRemoveCategory: (id: string) => void
  onAddItem: (categoryId: string, item: MenuItem) => void
  onUpdateItem: (categoryId: string, item: MenuItem) => void
  onRemoveItem: (categoryId: string, itemId: string) => void
}

const sectionStyle = css`
  background: ${COLOR_WHITE};
  border-radius: ${RADIUS_LG};
  border: 1px solid ${COLOR_YEHI_GREY};
  overflow: hidden;
`

const sectionHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACE_4} ${SPACE_6};
  background: #fdf9f7;
  border-bottom: 1px solid ${COLOR_YEHI_GREY};
`

const categoryLabelStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
`

const headerActionsStyle = css`
  display: flex;
  gap: ${SPACE_3};
`

const addBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_4};
  background: ${COLOR_WALNUT};
  color: ${COLOR_WHITE};
  border: none;
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${COLOR_WALNUT_DARK};
  }
`

const deleteCategoryBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_4};
  background: transparent;
  color: #c0392b;
  border: 1px solid #e0b0ac;
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fdf0ef;
  }
`

const itemListStyle = css`
  display: flex;
  flex-direction: column;
`

const itemRowStyle = css`
  display: flex;
  align-items: center;
  padding: ${SPACE_3} ${SPACE_6};
  border-bottom: 1px solid #f5eded;
  gap: ${SPACE_4};

  &:last-child {
    border-bottom: none;
  }
`

const itemInfoStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const itemNameStyle = css`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLOR_WALNUT_DARK};
`

const itemSubStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
`

const itemPriceStyle = css`
  font-size: 0.875rem;
  color: ${COLOR_WALNUT};
  font-weight: 500;
  white-space: nowrap;
`

const itemActionsStyle = css`
  display: flex;
  gap: ${SPACE_2};
`

const iconBtnStyle = (danger = false) => css`
  padding: ${SPACE_2} ${SPACE_3};
  background: transparent;
  border: 1px solid ${danger ? '#e0b0ac' : COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  color: ${danger ? '#c0392b' : COLOR_WALNUT_LIGHT};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${danger ? '#fdf0ef' : '#f5f0ee'};
  }
`

const emptyStyle = css`
  padding: ${SPACE_8};
  text-align: center;
  font-size: 0.875rem;
  color: ${COLOR_YEHI_GREY};
`

export function CategorySection({
  category,
  items,
  onRemoveCategory,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: CategorySectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const handleOpenAdd = () => {
    setEditingItem(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item)
    setModalOpen(true)
  }

  const handleSave = (item: MenuItem) => {
    if (editingItem) {
      onUpdateItem(category.id, item)
    } else {
      onAddItem(category.id, item)
    }
    setModalOpen(false)
    setEditingItem(null)
  }

  const handleRemoveCategory = () => {
    if (confirm(`"${category.label}" 카테고리와 포함된 메뉴를 모두 삭제할까요?`)) {
      onRemoveCategory(category.id)
    }
  }

  return (
    <>
      <section css={sectionStyle}>
        <div css={sectionHeaderStyle}>
          <span css={categoryLabelStyle}>{category.label}</span>
          <div css={headerActionsStyle}>
            <button css={addBtnStyle} onClick={handleOpenAdd}>+ 메뉴 추가</button>
            <button css={deleteCategoryBtnStyle} onClick={handleRemoveCategory}>카테고리 삭제</button>
          </div>
        </div>

        <div css={itemListStyle}>
          {items.length === 0 ? (
            <p css={emptyStyle}>메뉴가 없습니다.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} css={itemRowStyle}>
                <div css={itemInfoStyle}>
                  <span css={itemNameStyle}>{item.name}</span>
                  <span css={itemSubStyle}>{item.nameEn}</span>
                  {item.desc && <span css={itemSubStyle}>{item.desc}</span>}
                </div>
                <span css={itemPriceStyle}>₩{Number(item.price).toLocaleString()}</span>
                <div css={itemActionsStyle}>
                  <button css={iconBtnStyle()} onClick={() => handleOpenEdit(item)}>수정</button>
                  <button css={iconBtnStyle(true)} onClick={() => onRemoveItem(category.id, item.id)}>삭제</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {modalOpen && (
        <ItemFormModal
          categoryId={category.id}
          item={editingItem}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
