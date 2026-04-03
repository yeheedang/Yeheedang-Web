/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'
import type { MenuCategory } from '../types'
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

interface AddCategoryModalProps {
  existingIds: string[]
  onAdd: (category: MenuCategory) => void
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
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const titleStyle = css`
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
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${COLOR_WALNUT};
  }
`

const hintStyle = css`
  font-size: 0.7rem;
  color: ${COLOR_YEHI_GREY};
`

const errorStyle = css`
  font-size: 0.75rem;
  color: #c0392b;
`

const buttonRowStyle = css`
  display: flex;
  gap: ${SPACE_3};
  justify-content: flex-end;
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

  &:hover:not(:disabled) {
    background: ${COLOR_WALNUT_DARK};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
`

const VALID_ID_PATTERN = /^[a-z][a-z0-9-]*$/

export function AddCategoryModal({ existingIds, onAdd, onClose }: AddCategoryModalProps) {
  const [id, setId] = useState('')
  const [label, setLabel] = useState('')

  const idError = id && !VALID_ID_PATTERN.test(id)
    ? '영소문자, 숫자, 하이픈만 사용 가능합니다 (영소문자 시작)'
    : id && existingIds.includes(id)
      ? '이미 존재하는 ID입니다.'
      : null

  const isValid = id && label.trim() && !idError

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onAdd({ id: id.trim(), label: label.trim() })
    onClose()
  }

  return (
    <div css={overlayStyle} onClick={onClose}>
      <form css={modalStyle} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 css={titleStyle}>카테고리 추가</h2>

        <div css={fieldStyle}>
          <label css={labelStyle}>카테고리 ID *</label>
          <input
            css={inputStyle}
            value={id}
            onChange={(e) => setId(e.target.value.toLowerCase())}
            placeholder="예) dessert"
            autoFocus
          />
          <span css={hintStyle}>영소문자/숫자/하이픈 조합 (내부 식별자)</span>
          {idError && <span css={errorStyle}>{idError}</span>}
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>카테고리명 *</label>
          <input
            css={inputStyle}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="예) 디저트"
          />
        </div>

        <div css={buttonRowStyle}>
          <button css={secondaryBtnStyle} type="button" onClick={onClose}>취소</button>
          <button css={primaryBtnStyle} type="submit" disabled={!isValid}>추가</button>
        </div>
      </form>
    </div>
  )
}
