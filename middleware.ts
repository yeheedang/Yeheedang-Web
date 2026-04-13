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
  if (pathname.startsWith(LOGIN_PATH)) {
    return NextResponse.next()
  }

  // 쿠키 존재 여부만 확인 (세션 유효성은 서버 컴포넌트 레이아웃에서 검증)
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/manage/:path*'],
}
