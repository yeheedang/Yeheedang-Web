import { NextResponse } from 'next/server'
import { head, put } from '@vercel/blob'
import { readFile } from 'fs/promises'
import path from 'path'

const MENU_BLOB_KEY = 'data/menu.json'

async function fetchMenuFromBlob(): Promise<object | null> {
  try {
    const info = await head(MENU_BLOB_KEY)
    const res = await fetch(info.url, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchMenuFromLocal(): Promise<object> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'menu.json')
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function GET() {
  const blobData = await fetchMenuFromBlob()
  if (blobData) {
    return NextResponse.json(blobData)
  }

  const localData = await fetchMenuFromLocal()
  return NextResponse.json(localData)
}
