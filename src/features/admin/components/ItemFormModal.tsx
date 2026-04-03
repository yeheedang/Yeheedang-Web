/** @jsxImportSource @emotion/react */
'use client'

import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import type { MenuItem } from '../types'
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
  Z_MODAL,
} from '@/styles/tokens'

interface ItemFormModalProps {
  categoryId: string
  item?: MenuItem | null
  onSave: (item: MenuItem) => void
  onClose: () => void
}

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${Z_MODAL};
  padding: ${SPACE_4};
`

const modalStyle = css`
  background: ${COLOR_WHITE};
  border-radius: ${RADIUS_LG};
  padding: ${SPACE_8};
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const modalTitleStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
`

const fieldStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_2};
`

const labelStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  font-weight: 500;
`

const inputStyle = css`
  padding: ${SPACE_3} ${SPACE_4};
  border: 1px solid ${COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  color: ${COLOR_WALNUT_DARK};
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: ${COLOR_WALNUT};
  }
`

const textareaStyle = css`
  ${inputStyle};
  resize: vertical;
  min-height: 72px;
`

const buttonRowStyle = css`
  display: flex;
  gap: ${SPACE_3};
  justify-content: flex-end;
  margin-top: ${SPACE_2};
`

const primaryBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_6};
  background: ${COLOR_WALNUT};
  color: ${COLOR_WHITE};
  border: none;
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${COLOR_WALNUT_DARK};
  }
`

const secondaryBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_6};
  background: transparent;
  color: ${COLOR_WALNUT_LIGHT};
  border: 1px solid ${COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${COLOR_WALNUT_LIGHT};
  }
`

function generateItemId(categoryId: string): string {
  return `${categoryId}-${Date.now()}`
}

export function ItemFormModal({ categoryId, item, onSave, onClose }: ItemFormModalProps) {
  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    desc: '',
    price: '',
  })

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        nameEn: item.nameEn,
        desc: item.desc,
        price: item.price,
      })
    }
  }, [item])

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price.trim()) return

    onSave({
      id: item?.id ?? generateItemId(categoryId),
      name: form.name.trim(),
      nameEn: form.nameEn.trim(),
      desc: form.desc.trim(),
      price: form.price.trim(),
      image: item?.image ?? null,
    })
  }

  const isValid = form.name.trim() && form.price.trim()

  return (
    <div css={overlayStyle} onClick={onClose}>
      <form css={modalStyle} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 css={modalTitleStyle}>{item ? '메뉴 수정' : '메뉴 추가'}</h2>

        <div css={fieldStyle}>
          <label css={labelStyle}>메뉴명 *</label>
          <input css={inputStyle} value={form.name} onChange={handleChange('name')} placeholder="예) 매화 약과" autoFocus />
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>영문명</label>
          <input css={inputStyle} value={form.nameEn} onChange={handleChange('nameEn')} placeholder="예) Plum Blossom Yak-gwa" />
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>설명</label>
          <textarea css={textareaStyle} value={form.desc} onChange={handleChange('desc')} placeholder="메뉴 설명을 입력하세요" />
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>가격 (원) *</label>
          <input css={inputStyle} value={form.price} onChange={handleChange('price')} placeholder="예) 5500" type="number" min="0" />
        </div>

        <div css={buttonRowStyle}>
          <button css={secondaryBtnStyle} type="button" onClick={onClose}>취소</button>
          <button css={primaryBtnStyle} type="submit" disabled={!isValid}>저장</button>
        </div>
      </form>
    </div>
  )
}
