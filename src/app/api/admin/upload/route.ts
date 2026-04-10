import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  const expectedSession = process.env.ADMIN_SESSION_SECRET
  return !!expectedSession && sessionCookie?.value === expectedSession
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_BYTES = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: '지원하지 않는 파일 형식입니다. (jpg, png, webp, avif)' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 })
  }

  const folder = (formData.get('folder') as string | null) ?? 'menu'
  const allowedFolders = ['menu', 'gallery']
  const safeFolder = allowedFolders.includes(folder) ? folder : 'menu'

  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${safeFolder}/${Date.now()}.${ext}`

  const blob = await put(filename, file, {
    access: 'public',
    contentType: file.type,
  })

  return NextResponse.json({ url: blob.url })
}
