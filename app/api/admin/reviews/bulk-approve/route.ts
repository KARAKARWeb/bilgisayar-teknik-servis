import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const REVIEWS_FILE = path.join(process.cwd(), 'content/reviews.json')

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json()
    
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'IDs required' }, { status: 400 })
    }
    
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    const reviews = JSON.parse(data)
    
    const updated = reviews.map((r: any) => 
      ids.includes(r.id) ? { ...r, approved: true } : r
    )
    
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(updated, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to approve reviews' }, { status: 500 })
  }
}
