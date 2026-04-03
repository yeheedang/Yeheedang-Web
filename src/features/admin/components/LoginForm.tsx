/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  COLOR_WALNUT,
  COLOR_WALNUT_DARK,
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
} from '@/styles/tokens'

const containerStyle = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_WALNUT_DARK};
`

const cardStyle = css`
  background: ${COLOR_WHITE};
  padding: ${SPACE_16};
  border-radius: ${RADIUS_LG};
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${SPACE_6};
`

const titleStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLOR_WALNUT_DARK};
  text-align: center;
  letter-spacing: 0.05em;
`

const subtitleStyle = css`
  font-size: 0.75rem;
  color: ${COLOR_YEHI_GREY};
  text-align: center;
  margin-top: -${SPACE_4};
`

const inputStyle = css`
  width: 100%;
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

const buttonStyle = css`
  width: 100%;
  padding: ${SPACE_3} ${SPACE_4};
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

const errorStyle = css`
  font-size: 0.75rem;
  color: #c0392b;
  text-align: center;
  padding: ${SPACE_2} ${SPACE_4};
  background: #fdf0ef;
  border-radius: ${RADIUS_MD};
`

export function LoginForm() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) return

    setLoading(true)
    setError(null)

    try {
      await axios.post('/api/admin/auth', { token: token.trim() })
      router.push('/manage')
    } catch {
      setError('올바르지 않은 접근 토큰입니다.')
      setToken('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div css={containerStyle}>
      <form css={cardStyle} onSubmit={handleSubmit}>
        <h1 css={titleStyle}>예히당 관리</h1>
        <p css={subtitleStyle}>접근 토큰을 입력하세요</p>
        <input
          css={inputStyle}
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="접근 토큰"
          autoComplete="off"
          autoFocus
        />
        {error && <p css={errorStyle}>{error}</p>}
        <button css={buttonStyle} type="submit" disabled={loading || !token.trim()}>
          {loading ? '확인 중...' : '입장'}
        </button>
      </form>
    </div>
  )
}
