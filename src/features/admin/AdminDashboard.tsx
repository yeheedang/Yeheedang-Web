/** @jsxImportSource @emotion/react */
'use client'

import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useMenuAdmin } from './hooks/useMenuAdmin'
import { useGalleryAdmin } from './hooks/useGalleryAdmin'
import { useSessionTimer } from './hooks/useSessionTimer'
import { CategorySection } from './components/CategorySection'
import { AddCategoryModal } from './components/AddCategoryModal'
import { GalleryAdminSection } from './components/GalleryAdminSection'
import { SessionTimer } from './components/SessionTimer'
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
  SPACE_16,
  RADIUS_MD,
  RADIUS_LG,
  RADIUS_PILL,
} from '@/styles/tokens'

type AdminTab = 'menu' | 'gallery'

const pageStyle = css`
  min-height: 100vh;
  background: #faf7f5;
  font-family: 'Noto Serif KR', serif;
`

const topBarStyle = css`
  background: ${COLOR_WALNUT_DARK};
  color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACE_4} ${SPACE_8};
`

const topBarTitleStyle = css`
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
`

const topBarActionsStyle = css`
  display: flex;
  gap: ${SPACE_3};
  align-items: center;
`

const saveStatusStyle = css`
  font-size: 0.75rem;
  color: #a0c0a0;
`

const savingStatusStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_YEHI_GREY};
`

const logoutBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_4};
  background: transparent;
  color: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${COLOR_WHITE};
  }
`

const mainStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: ${SPACE_8};
  display: flex;
  flex-direction: column;
  gap: ${SPACE_6};
`

const pageHeadStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const pageTitleStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
`

const addCategoryBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_6};
  background: transparent;
  color: ${COLOR_WALNUT};
  border: 1px solid ${COLOR_WALNUT};
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(74,55,40,0.06);
  }
`

const errorBannerStyle = css`
  padding: ${SPACE_3} ${SPACE_4};
  background: #fdf0ef;
  border: 1px solid #e0b0ac;
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  color: #c0392b;
`

const savedBannerStyle = css`
  padding: ${SPACE_3} ${SPACE_4};
  background: #f0fdf4;
  border: 1px solid #a0d0a0;
  border-radius: ${RADIUS_MD};
  font-size: 0.875rem;
  color: #276749;
`

const loadingStyle = css`
  text-align: center;
  padding: ${SPACE_16};
  color: ${COLOR_WALNUT_LIGHT};
  font-size: 0.875rem;
`

const tabBarStyle = css`
  display: flex;
  gap: ${SPACE_2};
  border-bottom: 1px solid ${COLOR_YEHI_GREY};
  padding-bottom: ${SPACE_4};
`

const tabBtnStyle = (isActive: boolean) => css`
  padding: ${SPACE_2} ${SPACE_6};
  border-radius: ${RADIUS_PILL};
  border: 1px solid ${isActive ? COLOR_WALNUT : 'transparent'};
  background: ${isActive ? COLOR_WALNUT : 'transparent'};
  color: ${isActive ? COLOR_WHITE : COLOR_WALNUT_LIGHT};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${COLOR_WALNUT};
    color: ${isActive ? COLOR_WHITE : COLOR_WALNUT};
  }
`

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>('menu')
  const { remainingSec, isWarning, isExtending, extendSession } = useSessionTimer()

  const {
    menuData,
    loading: menuLoading,
    saving: menuSaving,
    savedAt: menuSavedAt,
    error: menuError,
    fetchMenu,
    addCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
    reorderItems,
  } = useMenuAdmin()

  const {
    galleryData,
    loading: galleryLoading,
    saving: gallerySaving,
    savedAt: gallerySavedAt,
    error: galleryError,
    fetchGallery,
    addImage,
    updateImage,
    removeImage,
    reorderImages,
  } = useGalleryAdmin()

  const loading = activeTab === 'menu' ? menuLoading : galleryLoading
  const saving = activeTab === 'menu' ? menuSaving : gallerySaving
  const savedAt = activeTab === 'menu' ? menuSavedAt : gallerySavedAt
  const error = activeTab === 'menu' ? menuError : galleryError

  const [addCategoryOpen, setAddCategoryOpen] = useState(false)

  useEffect(() => {
    fetchMenu()
    fetchGallery()
  }, [fetchMenu, fetchGallery])

  const handleLogout = async () => {
    await axios.delete('/api/admin/auth')
    router.push('/manage/login')
  }

  return (
    <div css={pageStyle}>
      <div css={topBarStyle}>
        <span css={topBarTitleStyle}>예히당 관리자</span>
        <div css={topBarActionsStyle}>
          {saving && <span css={savingStatusStyle}>저장 중...</span>}
          {!saving && savedAt && (
            <span css={saveStatusStyle}>
              저장됨 {savedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <SessionTimer
            remainingSec={remainingSec}
            isWarning={isWarning}
            isExtending={isExtending}
            onExtend={extendSession}
          />
          <button css={logoutBtnStyle} onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      <main css={mainStyle}>
        <div css={tabBarStyle}>
          <button css={tabBtnStyle(activeTab === 'menu')} onClick={() => setActiveTab('menu')}>
            메뉴 관리
          </button>
          <button css={tabBtnStyle(activeTab === 'gallery')} onClick={() => setActiveTab('gallery')}>
            갤러리 관리
          </button>
        </div>

        {activeTab === 'menu' && (
          <>
            <div css={pageHeadStyle}>
              <h1 css={pageTitleStyle}>메뉴 관리</h1>
              <button css={addCategoryBtnStyle} onClick={() => setAddCategoryOpen(true)}>
                + 카테고리 추가
              </button>
            </div>

            {error && <p css={errorBannerStyle}>{error}</p>}
            {loading && <p css={loadingStyle}>불러오는 중...</p>}

            {menuData?.categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                items={menuData.items[category.id] ?? []}
                onRemoveCategory={removeCategory}
                onAddItem={addItem}
                onUpdateItem={updateItem}
                onRemoveItem={removeItem}
                onReorderItems={reorderItems}
              />
            ))}
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <div css={pageHeadStyle}>
              <h1 css={pageTitleStyle}>갤러리 관리</h1>
            </div>

            {error && <p css={errorBannerStyle}>{error}</p>}
            {loading && <p css={loadingStyle}>불러오는 중...</p>}

            {!loading && (
              <GalleryAdminSection
                images={galleryData?.images ?? []}
                onAdd={addImage}
                onUpdate={updateImage}
                onRemove={removeImage}
                onReorder={reorderImages}
              />
            )}
          </>
        )}
      </main>

      {addCategoryOpen && (
        <AddCategoryModal
          existingIds={menuData?.categories.map((c) => c.id) ?? []}
          onAdd={addCategory}
          onClose={() => setAddCategoryOpen(false)}
        />
      )}
    </div>
  )
}
