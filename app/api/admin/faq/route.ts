import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FAQ_FILE = path.join(process.cwd(), 'content/faq.json')

export async function GET() {
  try {
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const faq = JSON.parse(data)
    return NextResponse.json(faq)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read FAQ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newFAQ = await request.json()
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const faq = JSON.parse(data)
    
    faq.push(newFAQ)
    await fs.writeFile(FAQ_FILE, JSON.stringify(faq, null, 2))
    
    return NextResponse.json({ success: true, faq: newFAQ })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedFAQ = await request.json()
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const faq = JSON.parse(data)
    
    const index = faq.findIndex((f: any) => f.id === updatedFAQ.id)
    if (index === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    faq[index] = updatedFAQ
    await fs.writeFile(FAQ_FILE, JSON.stringify(faq, null, 2))
    
    return NextResponse.json({ success: true, faq: updatedFAQ })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fs.readFile(FAQ_FILE, 'utf-8')
    const faq = JSON.parse(data)
    
    const filtered = faq.filter((f: any) => f.id !== id)
    await fs.writeFile(FAQ_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
