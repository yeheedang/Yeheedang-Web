import { NextRequest, NextResponse } from 'next/server'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'
const COOKIE_MAX_AGE_SEC = 60 * 60 * 8 // 8시간

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body?.token) {
    return NextResponse.json({ error: '토큰이 필요합니다.' }, { status: 400 })
  }

  const secretToken = process.env.ADMIN_SECRET_TOKEN
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!secretToken || !sessionSecret) {
    return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 })
  }

  if (body.token !== secretToken) {
    return NextResponse.json({ error: '올바르지 않은 토큰입니다.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE_NAME, sessionSecret, {
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
