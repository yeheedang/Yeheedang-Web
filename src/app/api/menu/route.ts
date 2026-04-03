import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'menu.json')
  const raw = await readFile(filePath, 'utf-8')
  const data = JSON.parse(raw)
  return NextResponse.json(data)
}
