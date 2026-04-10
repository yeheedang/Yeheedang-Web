/** @jsxImportSource @emotion/react */
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import type { GalleryImage } from '../types'
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

interface GalleryAdminSectionProps {
  images: GalleryImage[]
  onAdd: (image: GalleryImage) => void
  onUpdate: (image: GalleryImage) => void
  onRemove: (id: string) => void
  onReorder: (images: GalleryImage[]) => void
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

const sectionTitleStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
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

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${SPACE_4};
  padding: ${SPACE_6};
`

const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_2};
  border: 1px solid #f0e8e8;
  border-radius: ${RADIUS_MD};
  overflow: hidden;
  background: #fafafa;
`

const cardImageWrapStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f5eded;
`

const cardBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACE_2};
  padding: ${SPACE_3};
`

const cardCaptionStyle = css`
  font-size: 0.8rem;
  color: ${COLOR_WALNUT_DARK};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const cardActionsStyle = css`
  display: flex;
  gap: ${SPACE_2};
`

const iconBtnStyle = (danger = false) => css`
  flex: 1;
  padding: ${SPACE_2} 0;
  background: transparent;
  border: 1px solid ${danger ? '#e0b0ac' : COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  font-size: 0.7rem;
  color: ${danger ? '#c0392b' : COLOR_WALNUT_LIGHT};
  cursor: pointer;
  text-align: center;
  transition: background 0.2s;

  &:hover {
    background: ${danger ? '#fdf0ef' : '#f5f0ee'};
  }
`

const orderBtnStyle = css`
  flex: 1;
  padding: ${SPACE_2} 0;
  background: transparent;
  border: 1px solid ${COLOR_YEHI_GREY};
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  cursor: pointer;
  text-align: center;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #f5f0ee;
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
`

const emptyStyle = css`
  padding: ${SPACE_8};
  text-align: center;
  font-size: 0.875rem;
  color: ${COLOR_WALNUT_LIGHT};
`

// --- Modal styles ---

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

const imagePreviewStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${RADIUS_MD};
  overflow: hidden;
`

const imageHintStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  text-align: center;
`

const imageRemoveBtnStyle = css`
  font-size: 0.7rem;
  color: #e57373;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
`

const uploadingStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
`

const uploadErrorStyle = css`
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

function generateImageId(): string {
  return `g-${Date.now()}`
}

interface ImageModalProps {
  image: GalleryImage | null
  onSave: (image: GalleryImage) => void
  onClose: () => void
}

function ImageModal({ image, onSave, onClose }: ImageModalProps) {
  const [src, setSrc] = useState(image?.src ?? '')
  const [alt, setAlt] = useState(image?.alt ?? '')
  const [caption, setCaption] = useState(image?.caption ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'gallery')

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json()

    setIsUploading(false)

    if (!res.ok) {
      setUploadError(data.error ?? '업로드 실패')
      return
    }

    setSrc(data.url)
    if (!alt) setAlt(file.name.replace(/\.[^.]+$/, ''))
    e.target.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!src.trim() || !alt.trim()) return

    onSave({
      id: image?.id ?? generateImageId(),
      src: src.trim(),
      alt: alt.trim(),
      caption: caption.trim() || undefined,
    })
  }

  const isValid = src.trim() && alt.trim() && !isUploading

  return (
    <div css={overlayStyle} onClick={onClose}>
      <form css={modalStyle} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 css={modalTitleStyle}>{image ? '이미지 수정' : '이미지 추가'}</h2>

        <div css={fieldStyle}>
          <label css={labelStyle}>이미지 *</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div css={imageUploadAreaStyle} onClick={() => fileInputRef.current?.click()}>
            {src ? (
              <div css={imagePreviewStyle}>
                <Image src={src} alt={alt || '미리보기'} fill style={{ objectFit: 'cover' }} sizes="440px" />
              </div>
            ) : (
              <span css={imageHintStyle}>클릭하여 이미지 업로드 (jpg, png, webp, avif · 최대 5MB)</span>
            )}
            {isUploading && <span css={uploadingStyle}>업로드 중...</span>}
            {uploadError && <span css={uploadErrorStyle}>{uploadError}</span>}
          </div>
          {src && (
            <button css={imageRemoveBtnStyle} type="button" onClick={() => setSrc('')}>
              이미지 제거
            </button>
          )}
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>대체 텍스트 (alt) *</label>
          <input
            css={inputStyle}
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="예) 예히당 약과 세트"
          />
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle}>캡션</label>
          <input
            css={inputStyle}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="예) 봄 한정 약과 컬렉션"
          />
        </div>

        <div css={buttonRowStyle}>
          <button css={secondaryBtnStyle} type="button" onClick={onClose}>취소</button>
          <button css={primaryBtnStyle} type="submit" disabled={!isValid}>저장</button>
        </div>
      </form>
    </div>
  )
}

export function GalleryAdminSection({
  images,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: GalleryAdminSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

  const handleOpenAdd = () => {
    setEditingImage(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setModalOpen(true)
  }

  const handleSave = (image: GalleryImage) => {
    if (editingImage) {
      onUpdate(image)
    } else {
      onAdd(image)
    }
    setModalOpen(false)
    setEditingImage(null)
  }

  const move = (index: number, direction: 'left' | 'right') => {
    const next = [...images]
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
    onReorder(next)
  }

  return (
    <>
      <section css={sectionStyle}>
        <div css={sectionHeaderStyle}>
          <span css={sectionTitleStyle}>갤러리 이미지 ({images.length}장)</span>
          <button css={addBtnStyle} onClick={handleOpenAdd}>+ 이미지 추가</button>
        </div>

        {images.length === 0 ? (
          <p css={emptyStyle}>등록된 이미지가 없습니다.</p>
        ) : (
          <div css={gridStyle}>
            {images.map((image, index) => (
              <div key={image.id} css={cardStyle}>
                <div css={cardImageWrapStyle}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="220px"
                  />
                </div>
                <div css={cardBodyStyle}>
                  <span css={cardCaptionStyle}>{image.caption || image.alt}</span>
                  <div css={cardActionsStyle}>
                    <button
                      css={orderBtnStyle}
                      onClick={() => move(index, 'left')}
                      disabled={index === 0}
                      aria-label="앞으로 이동"
                    >
                      ←
                    </button>
                    <button
                      css={orderBtnStyle}
                      onClick={() => move(index, 'right')}
                      disabled={index === images.length - 1}
                      aria-label="뒤로 이동"
                    >
                      →
                    </button>
                  </div>
                  <div css={cardActionsStyle}>
                    <button css={iconBtnStyle()} onClick={() => handleOpenEdit(image)}>수정</button>
                    <button
                      css={iconBtnStyle(true)}
                      onClick={() => {
                        if (confirm('이미지를 삭제할까요?')) onRemove(image.id)
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <ImageModal
          image={editingImage}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
