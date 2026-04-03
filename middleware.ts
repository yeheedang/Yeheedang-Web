import { NextRequest, NextResponse } from 'next/server'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'
const ADMIN_PATH_PREFIX = '/manage'
const LOGIN_PATH = '/manage/login'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /manage 하위 경로만 처리
  if (!pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next()
  }

  // 로그인 페이지 자체는 통과
  if (pathname === LOGIN_PATH) {
    return NextResponse.next()
  }

  // 세션 쿠키 검증
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  // 쿠키 값이 환경변수 세션 시크릿과 일치하는지 확인
  const expectedSession = process.env.ADMIN_SESSION_SECRET
  if (!expectedSession || sessionCookie.value !== expectedSession) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    response.cookies.delete(ADMIN_COOKIE_NAME)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/manage/:path*'],
}
