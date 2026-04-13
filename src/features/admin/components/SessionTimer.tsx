/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { COLOR_WHITE, RADIUS_MD, SPACE_2, SPACE_3, SPACE_4 } from '@/styles/tokens'

interface SessionTimerProps {
  remainingSec: number
  isWarning: boolean
  isExtending: boolean
  onExtend: () => void
}

function formatTime(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}시간 ${m}분`
  if (m > 0) return `${m}분 ${s}초`
  return `${s}초`
}

const wrapperStyle = (isWarning: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${SPACE_3};
  padding: ${SPACE_2} ${SPACE_3};
  border-radius: ${RADIUS_MD};
  background: ${isWarning ? 'rgba(220,53,69,0.15)' : 'rgba(255,255,255,0.08)'};
  border: 1px solid ${isWarning ? 'rgba(220,53,69,0.5)' : 'rgba(255,255,255,0.15)'};
  transition: background 0.3s, border-color 0.3s;
`

const timerTextStyle = (isWarning: boolean) => css`
  font-size: 0.75rem;
  color: ${isWarning ? '#ff8080' : 'rgba(255,255,255,0.6)'};
  font-variant-numeric: tabular-nums;
  transition: color 0.3s;
`

const extendBtnStyle = (isWarning: boolean) => css`
  padding: ${SPACE_2} ${SPACE_4};
  background: ${isWarning ? 'rgba(220,53,69,0.8)' : 'rgba(255,255,255,0.12)'};
  color: ${COLOR_WHITE};
  border: 1px solid ${isWarning ? 'rgba(220,53,69,0.9)' : 'rgba(255,255,255,0.25)'};
  border-radius: ${RADIUS_MD};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${isWarning ? 'rgba(220,53,69,1)' : 'rgba(255,255,255,0.2)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export function SessionTimer({ remainingSec, isWarning, isExtending, onExtend }: SessionTimerProps) {
  return (
    <div css={wrapperStyle(isWarning)}>
      <span css={timerTextStyle(isWarning)}>
        {isWarning ? '⚠ ' : ''}세션 {formatTime(remainingSec)} 남음
      </span>
      <button
        css={extendBtnStyle(isWarning)}
        onClick={onExtend}
        disabled={isExtending}
      >
        {isExtending ? '연장 중...' : '8시간 연장'}
      </button>
    </div>
  )
}
