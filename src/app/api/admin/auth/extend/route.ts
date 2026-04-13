import { NextRequest, NextResponse } from 'next/server'
import { extendSession } from '@/lib/adminAuth'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'
const COOKIE_MAX_AGE_SEC = 60 * 60 * 8 // 8시간

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value

  if (!sessionToken) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const newToken = await extendSession(sessionToken, COOKIE_MAX_AGE_SEC)

  if (!newToken) {
    return NextResponse.json({ error: '세션이 만료되었습니다. 다시 로그인하세요.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true, expiresAt: Date.now() + COOKIE_MAX_AGE_SEC * 1000 })
  response.cookies.set(ADMIN_COOKIE_NAME, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE_SEC,
    path: '/',
  })

  return response
}
