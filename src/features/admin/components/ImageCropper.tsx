/** @jsxImportSource @emotion/react */
'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { css } from '@emotion/react'
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

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedBlob: Blob) => void
  onCancel: () => void
}

const CROP_SIZE = 480

async function getCroppedBlob(imageSrc: string, pixelCrop: CropArea): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('캔버스 변환 실패'))
    }, 'image/jpeg', 0.92)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${Z_MODAL + 10};
  padding: ${SPACE_4};
`

const panelStyle = css`
  background: ${COLOR_WHITE};
  border-radius: ${RADIUS_LG};
  padding: ${SPACE_6};
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_4};
`

const titleStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
`

const cropAreaStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #111;
  border-radius: ${RADIUS_MD};
  overflow: hidden;
`

const sliderRowStyle = css`
  display: flex;
  align-items: center;
  gap: ${SPACE_3};
`

const sliderLabelStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  white-space: nowrap;
  min-width: 32px;
`

const sliderStyle = css`
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: ${COLOR_YEHI_GREY};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${COLOR_WALNUT};
    cursor: pointer;
  }
`

const hintStyle = css`
  font-size: 0.72rem;
  color: ${COLOR_WALNUT_LIGHT};
  text-align: center;
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
`

const processingStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_WALNUT_LIGHT};
  text-align: center;
`

export function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCropComplete = useCallback((_: unknown, pixels: CropArea) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return
    setIsProcessing(true)
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels)
      onCropComplete(blob)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div css={overlayStyle} onClick={onCancel}>
      <div css={panelStyle} onClick={(e) => e.stopPropagation()}>
        <h2 css={titleStyle}>이미지 편집 (1:1 크롭)</h2>

        <div css={cropAreaStyle}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropSize={{ width: CROP_SIZE, height: CROP_SIZE }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            showGrid={true}
          />
        </div>

        <div css={sliderRowStyle}>
          <span css={sliderLabelStyle}>확대</span>
          <input
            css={sliderStyle}
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <span css={sliderLabelStyle}>{zoom.toFixed(1)}×</span>
        </div>

        <p css={hintStyle}>드래그로 위치 조절 · 슬라이더 또는 핀치로 확대/축소</p>

        {isProcessing && <p css={processingStyle}>처리 중...</p>}

        <div css={buttonRowStyle}>
          <button css={secondaryBtnStyle} type="button" onClick={onCancel} disabled={isProcessing}>
            취소
          </button>
          <button css={primaryBtnStyle} type="button" onClick={handleConfirm} disabled={isProcessing}>
            적용
          </button>
        </div>
      </div>
    </div>
  )
}
