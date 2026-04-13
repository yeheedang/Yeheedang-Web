import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SESSION_MAX_SEC = 60 * 60 * 8 // 8시간
const WARN_BEFORE_SEC = 10 * 60   // 만료 10분 전부터 경고

interface SessionTimerState {
  remainingSec: number
  isWarning: boolean
  isExtending: boolean
  extendSession: () => Promise<void>
}

export function useSessionTimer(): SessionTimerState {
  const router = useRouter()
  const [remainingSec, setRemainingSec] = useState(SESSION_MAX_SEC)
  const [isExtending, setIsExtending] = useState(false)
  const expiresAtRef = useRef(Date.now() + SESSION_MAX_SEC * 1000)

  useEffect(() => {
    const tick = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAtRef.current - Date.now()) / 1000))
      setRemainingSec(remaining)

      if (remaining === 0) {
        clearInterval(tick)
        router.push('/manage/login')
      }
    }, 1000)

    return () => clearInterval(tick)
  }, [router])

  const extendSession = useCallback(async () => {
    setIsExtending(true)
    try {
      const { data } = await axios.post<{ ok: boolean; expiresAt: number }>(
        '/api/admin/auth/extend'
      )
      expiresAtRef.current = data.expiresAt
      setRemainingSec(Math.floor((data.expiresAt - Date.now()) / 1000))
    } catch {
      router.push('/manage/login')
    } finally {
      setIsExtending(false)
    }
  }, [router])

  return {
    remainingSec,
    isWarning: remainingSec <= WARN_BEFORE_SEC,
    isExtending,
    extendSession,
  }
}
