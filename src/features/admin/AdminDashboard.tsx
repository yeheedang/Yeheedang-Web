/** @jsxImportSource @emotion/react */
'use client'

import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useMenuAdmin } from './hooks/useMenuAdmin'
import { CategorySection } from './components/CategorySection'
import { AddCategoryModal } from './components/AddCategoryModal'
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
  SPACE_12,
  SPACE_16,
  RADIUS_MD,
  RADIUS_LG,
} from '@/styles/tokens'

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

const saveStatusStyle = (hasChanges: boolean) => css`
  font-size: 0.75rem;
  color: ${hasChanges ? COLOR_YEHI_GREY : '#a0c0a0'};
`

const saveBtnStyle = css`
  padding: ${SPACE_2} ${SPACE_6};
  background: ${COLOR_WALNUT};
  color: ${COLOR_WHITE};
  border: none;
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #3a2818;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

export function AdminDashboard() {
  const router = useRouter()
  const {
    menuData,
    loading,
    saving,
    error,
    fetchMenu,
    saveMenu,
    addCategory,
    removeCategory,
    addItem,
    updateItem,
    removeItem,
  } = useMenuAdmin()

  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  const handleSave = async () => {
    if (!menuData) return
    const ok = await saveMenu(menuData)
    if (ok) {
      setSavedAt(new Date())
      setHasUnsavedChanges(false)
    }
  }

  const handleLogout = async () => {
    await axios.delete('/api/admin/auth')
    router.push('/manage/login')
  }

  const markChanged = () => setHasUnsavedChanges(true)

  return (
    <div css={pageStyle}>
      <div css={topBarStyle}>
        <span css={topBarTitleStyle}>예히당 관리자</span>
        <div css={topBarActionsStyle}>
          {hasUnsavedChanges && (
            <span css={saveStatusStyle(true)}>저장되지 않은 변경사항</span>
          )}
          {savedAt && !hasUnsavedChanges && (
            <span css={saveStatusStyle(false)}>
              저장됨 {savedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button css={saveBtnStyle} onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
            {saving ? '저장 중...' : '저장'}
          </button>
          <button css={logoutBtnStyle} onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      <main css={mainStyle}>
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
            onRemoveCategory={(id) => { removeCategory(id); markChanged() }}
            onAddItem={(cid, item) => { addItem(cid, item); markChanged() }}
            onUpdateItem={(cid, item) => { updateItem(cid, item); markChanged() }}
            onRemoveItem={(cid, itemId) => { removeItem(cid, itemId); markChanged() }}
          />
        ))}
      </main>

      {addCategoryOpen && (
        <AddCategoryModal
          existingIds={menuData?.categories.map((c) => c.id) ?? []}
          onAdd={(cat) => { addCategory(cat); markChanged() }}
          onClose={() => setAddCategoryOpen(false)}
        />
      )}
    </div>
  )
}
