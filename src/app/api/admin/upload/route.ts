import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAuthenticated } from '@/lib/adminAuth'

const MAX_BYTES = 5 * 1024 * 1024 // 5MB

// MIME → 허용 확장자 매핑 (화이트리스트)
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

// Magic Bytes 시그니처 검증
interface MagicSignature {
  bytes: number[]
  offset: number
}

const MAGIC_SIGNATURES: Record<string, MagicSignature[]> = {
  'image/jpeg': [{ bytes: [0xff, 0xd8, 0xff], offset: 0 }],
  'image/png': [{ bytes: [0x89, 0x50, 0x4e, 0x47], offset: 0 }],
  'image/webp': [{ bytes: [0x52, 0x49, 0x46, 0x46], offset: 0 }], // RIFF header
  'image/avif': [{ bytes: [0x66, 0x74, 0x79, 0x70], offset: 4 }], // ftyp box
}

async function verifyMagicBytes(file: File): Promise<boolean> {
  const signatures = MAGIC_SIGNATURES[file.type]
  if (!signatures) return false

  const headerSize = 12
  const buffer = await file.slice(0, headerSize).arrayBuffer()
  const bytes = new Uint8Array(buffer)

  return signatures.some(({ bytes: sig, offset }) =>
    sig.every((byte, i) => bytes[offset + i] === byte)
  )
}

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

  // MIME 타입 화이트리스트 검증
  const ext = MIME_TO_EXT[file.type]
  if (!ext) {
    return NextResponse.json(
      { error: '지원하지 않는 파일 형식입니다. (jpg, png, webp, avif)' },
      { status: 400 }
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 })
  }

  // Magic Bytes 검증 (클라이언트 MIME 조작 방어)
  const isValidFile = await verifyMagicBytes(file)
  if (!isValidFile) {
    return NextResponse.json({ error: '유효하지 않은 파일입니다.' }, { status: 400 })
  }

  const folder = (formData.get('folder') as string | null) ?? 'menu'
  const allowedFolders = ['menu', 'gallery']
  const safeFolder = allowedFolders.includes(folder) ? folder : 'menu'

  // MIME에서 매핑된 확장자만 사용 (파일명 기반 확장자 완전 무시)
  const filename = `${safeFolder}/${crypto.randomUUID()}.${ext}`

  const blob = await put(filename, file, {
    access: 'public',
    contentType: file.type,
  })

  return NextResponse.json({ url: blob.url })
}
