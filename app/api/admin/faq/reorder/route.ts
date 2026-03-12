import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FAQ_FILE = path.join(process.cwd(), 'content/faq.json')

export async function POST(request: NextRequest) {
  try {
    const { faqs } = await request.json()
    
    if (!faqs || !Array.isArray(faqs)) {
      return NextResponse.json({ error: 'FAQs required' }, { status: 400 })
    }
    
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const allFaqs = JSON.parse(data)
    
    // Update order for each FAQ
    faqs.forEach(({ id, order }: { id: string; order: number }) => {
      const faq = allFaqs.find((f: any) => f.id === id)
      if (faq) {
        faq.order = order
      }
    })
    
    await fs.writeFile(FAQ_FILE, JSON.stringify(allFaqs, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder FAQs' }, { status: 500 })
  }
}
