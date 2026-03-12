import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FAQ_FILE = path.join(process.cwd(), 'content/faq.json')

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json()
    
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'IDs required' }, { status: 400 })
    }
    
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const faqs = JSON.parse(data)
    
    const filtered = faqs.filter((f: any) => !ids.includes(f.id))
    await fs.writeFile(FAQ_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQs' }, { status: 500 })
  }
}
