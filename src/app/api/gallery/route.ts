import { NextResponse } from 'next/server'
import { head } from '@vercel/blob'
import { readFile } from 'fs/promises'
import path from 'path'

const GALLERY_BLOB_KEY = 'data/gallery.json'

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

export async function GET() {
  const blobData = await fetchGalleryFromBlob()
  if (blobData) {
    return NextResponse.json(blobData)
  }

  const localData = await fetchGalleryFromLocal()
  return NextResponse.json(localData)
}
