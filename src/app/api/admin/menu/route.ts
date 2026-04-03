import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'menu.json')
const ADMIN_COOKIE_NAME = 'yehi_admin_session'

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  const expectedSession = process.env.ADMIN_SESSION_SECRET
  return !!expectedSession && sessionCookie?.value === expectedSession
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const raw = await readFile(MENU_FILE_PATH, 'utf-8')
  const data = JSON.parse(raw)
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body || !Array.isArray(body.categories) || typeof body.items !== 'object') {
    return NextResponse.json({ error: '올바르지 않은 데이터 형식입니다.' }, { status: 400 })
  }

  await writeFile(MENU_FILE_PATH, JSON.stringify(body, null, 2), 'utf-8')
  return NextResponse.json({ ok: true })
}
