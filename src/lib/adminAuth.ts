import { NextRequest } from 'next/server'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'
const HMAC_ALGORITHM = 'SHA-256'
const SEPARATOR = '.'

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.')

  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: HMAC_ALGORITHM },
    false,
    ['sign', 'verify']
  )
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBuf(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes.buffer
}

/**
 * 세션 토큰 발급: `{expiresAt}.{hmac}` 형태
 */
export async function createSessionToken(maxAgeSec: number): Promise<string> {
  const expiresAt = Date.now() + maxAgeSec * 1000
  const payload = String(expiresAt)
  const key = await getKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return `${payload}${SEPARATOR}${bufToHex(sig)}`
}

/**
 * 세션 토큰 검증: HMAC 서명 확인 + 만료 시간 확인
 */
export async function isValidSession(token: string): Promise<boolean> {
  try {
    const idx = token.indexOf(SEPARATOR)
    if (idx === -1) return false

    const payload = token.slice(0, idx)
    const sigHex = token.slice(idx + 1)
    const expiresAt = Number(payload)

    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false

    const key = await getKey()
    return crypto.subtle.verify(
      'HMAC',
      key,
      hexToBuf(sigHex),
      new TextEncoder().encode(payload)
    )
  } catch {
    return false
  }
}

/**
 * 만료 시간을 연장한 새 토큰 발급 (검증 후)
 */
export async function extendSession(token: string, maxAgeSec: number): Promise<string | null> {
  if (!(await isValidSession(token))) return null
  return createSessionToken(maxAgeSec)
}

/**
 * NextRequest 쿠키에서 세션 토큰을 읽어 검증
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!sessionToken) return false
  return isValidSession(sessionToken)
}
