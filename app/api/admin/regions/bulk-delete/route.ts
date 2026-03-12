import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const REGIONS_FILE = path.join(process.cwd(), 'content/regions.json')

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json()
    
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'IDs required' }, { status: 400 })
    }
    
    const data = await fs.readFile(REGIONS_FILE, 'utf-8')
    const regions = JSON.parse(data)
    
    const filtered = regions.filter((r: any) => !ids.includes(r.id))
    await fs.writeFile(REGIONS_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete regions' }, { status: 500 })
  }
}
