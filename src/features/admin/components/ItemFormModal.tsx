/** @jsxImportSource @emotion/react */
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import type { MenuItem } from '../types'
import { ImageCropper } from './ImageCropper'
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
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
  max-height: 90vh;
  overflow-y: auto;
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

const imageUploadAreaStyle = css`
  border: 1.5px dashed ${COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  padding: ${SPACE_4};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACE_3};
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${COLOR_WALNUT};
  }
`

const imageHintStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  text-align: center;
`

const imageGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${SPACE_3};
  width: 100%;
`

const imageThumbWrapStyle = css`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${RADIUS_MD};
  overflow: hidden;
  background: rgba(235, 203, 203, 0.15);
`

const imageThumbRemoveStyle = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  line-height: 1;

  &:hover {
    background: rgba(200, 50, 50, 0.8);
  }
`

const addMoreBtnStyle = css`
  aspect-ratio: 4 / 3;
  border: 1.5px dashed ${COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: ${COLOR_WALNUT_LIGHT};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${COLOR_WALNUT};
    color: ${COLOR_WALNUT};
  }
`

const uploadingStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
`

const errorStyle = css`
  font-size: 0.75rem;
  color: #e57373;
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
  transition: border-color 0.2s;

  &:hover {
    border-color: ${COLOR_WALNUT_LIGHT};
  }
`

function generateItemId(categoryId: string): string {
  return `${categoryId}-${crypto.randomUUID()}`
}

export function ItemFormModal({ categoryId, item, onSave, onClose }: ItemFormModalProps) {
  const [form, setForm] = useState({ name: '', nameEn: '', desc: '', price: '' })
  const [images, setImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [cropQueue, setCropQueue] = useState<{ src: string; name: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (item) {
      setForm({ name: item.name, nameEn: item.nameEn, desc: item.desc, price: item.price })
      if (item.images && item.images.length > 0) {
        setImages(item.images)
      } else if (item.image) {
        setImages([item.image])
      }
    }
  }, [item])

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const queue = files.map((f) => ({
      src: URL.createObjectURL(f),
      name: f.name.replace(/\.[^.]+$/, ''),
    }))
    setCropQueue(queue)
    e.target.value = ''
  }

  const handleCropComplete = async (blob: Blob) => {
    const current = cropQueue[0]
    if (current) URL.revokeObjectURL(current.src)
    setCropQueue((prev) => prev.slice(1))

    setUploadError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', blob, `${current?.name ?? 'image'}.jpg`)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json()

    setIsUploading(false)

    if (!res.ok) {
      setUploadError(data.error ?? '업로드 실패')
      return
    }

    setImages((prev) => [...prev, data.url])
  }

  const handleCropCancel = () => {
    cropQueue.forEach((item) => URL.revokeObjectURL(item.src))
    setCropQueue([])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
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
      image: images[0] ?? null,
      images: images.length > 0 ? images : undefined,
    })
  }

  const isValid = form.name.trim() && form.price.trim() && !isUploading

  return (
    <>
    {cropQueue.length > 0 && (
      <ImageCropper
        imageSrc={cropQueue[0].src}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
      />
    )}
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
          <label css={labelStyle}>이미지 (여러 장 업로드 가능)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            style={{ display: 'none' }}
            onChange={handleFilesChange}
          />

          {images.length === 0 ? (
            <div css={imageUploadAreaStyle} onClick={() => fileInputRef.current?.click()}>
              <span css={imageHintStyle}>클릭하여 이미지 업로드 (여러 장 선택 가능 · jpg, png, webp · 최대 5MB)</span>
            </div>
          ) : (
            <div css={imageGridStyle}>
              {images.map((url, i) => (
                <div key={url + i} css={imageThumbWrapStyle}>
                  <Image src={url} alt={`이미지 ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="160px" />
                  <button
                    css={imageThumbRemoveStyle}
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label={`이미지 ${i + 1} 제거`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                css={addMoreBtnStyle}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="이미지 추가"
              >
                +
              </button>
            </div>
          )}

          {isUploading && <span css={uploadingStyle}>업로드 중...</span>}
          {uploadError && <span css={errorStyle}>{uploadError}</span>}
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
    </>
  )
}
