import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken } from '@/lib/adminAuth'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'
const COOKIE_MAX_AGE_SEC = 60 * 60 * 8 // 8시간

// IP별 로그인 시도 추적
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 30 * 60 * 1000 // 30분

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (record.count >= MAX_ATTEMPTS) return true

  record.count += 1
  return false
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: '로그인 시도가 너무 많습니다. 30분 후 다시 시도하세요.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => null)

  if (!body?.token) {
    return NextResponse.json({ error: '토큰이 필요합니다.' }, { status: 400 })
  }

  const secretToken = process.env.ADMIN_SECRET_TOKEN

  if (!secretToken) {
    return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 })
  }

  if (body.token !== secretToken) {
    return NextResponse.json({ error: '올바르지 않은 토큰입니다.' }, { status: 401 })
  }

  loginAttempts.delete(ip)

  const sessionToken = await createSessionToken(COOKIE_MAX_AGE_SEC)

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE_SEC,
    path: '/',
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(ADMIN_COOKIE_NAME)
  return response
}
