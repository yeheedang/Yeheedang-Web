import { NextRequest } from 'next/server'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'

// 세션 저장소: sessionToken → 만료 Unix ms
// auth route와 공유하기 위해 module-level singleton으로 관리
export const activeSessions = new Map<string, number>()

export function isValidSession(sessionToken: string): boolean {
  const expiry = activeSessions.get(sessionToken)
  if (!expiry) return false
  if (Date.now() > expiry) {
    activeSessions.delete(sessionToken)
    return false
  }
  return true
}

export function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  if (!sessionCookie?.value) return false
  return isValidSession(sessionCookie.value)
}

export function extendSession(sessionToken: string, maxAgeSec: number): boolean {
  if (!isValidSession(sessionToken)) return false
  activeSessions.set(sessionToken, Date.now() + maxAgeSec * 1000)
  return true
}
