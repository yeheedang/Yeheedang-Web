import { NextRequest, NextResponse } from 'next/server'
import { head, put } from '@vercel/blob'
import { readFile } from 'fs/promises'
import path from 'path'

const GALLERY_BLOB_KEY = 'data/gallery.json'
const ADMIN_COOKIE_NAME = 'yehi_admin_session'

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  const expectedSession = process.env.ADMIN_SESSION_SECRET
  return !!expectedSession && sessionCookie?.value === expectedSession
}

async function fetchGalleryFromBlob(): Promise<object | null> {
  try {
    const info = await head(GALLERY_BLOB_KEY)
    const res = await fetch(info.url, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchGalleryFromLocal(): Promise<object> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'gallery.json')
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const blobData = await fetchGalleryFromBlob()
  if (blobData) {
    return NextResponse.json(blobData)
  }

  const localData = await fetchGalleryFromLocal()
  return NextResponse.json(localData)
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body || !Array.isArray(body.images)) {
    return NextResponse.json({ error: '올바르지 않은 데이터 형식입니다.' }, { status: 400 })
  }

  try {
    await put(GALLERY_BLOB_KEY, JSON.stringify(body), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Blob 저장 실패: ${message}` }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
