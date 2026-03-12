import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'page-settings.json')
    const content = await fs.readFile(filePath, 'utf-8')
    const settings = JSON.parse(content)
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error reading page settings:', error)
    return NextResponse.json({ error: 'Failed to read page settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { page, settings } = await request.json()
    const filePath = path.join(process.cwd(), 'content', 'page-settings.json')
    
    // Mevcut ayarları oku
    const currentContent = await fs.readFile(filePath, 'utf-8')
    const currentSettings = JSON.parse(currentContent)
    
    // Sadece ilgili sayfanın ayarlarını güncelle
    currentSettings[page] = settings
    
    // Dosyayı kaydet
    await fs.writeFile(filePath, JSON.stringify(currentSettings, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating page settings:', error)
    return NextResponse.json({ error: 'Failed to update page settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const pageSettings = await request.json()
    const filePath = path.join(process.cwd(), 'content', 'page-settings.json')
    
    await fs.writeFile(filePath, JSON.stringify(pageSettings, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating page settings:', error)
    return NextResponse.json({ error: 'Failed to update page settings' }, { status: 500 })
  }
}
