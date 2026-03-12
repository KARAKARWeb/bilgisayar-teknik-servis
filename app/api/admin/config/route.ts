import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const CONFIG_FILE = path.join(process.cwd(), 'config/site.json')

export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8')
    const config = JSON.parse(data)
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { footer, ...updatedConfig } = data
    
    // Config dosyasını güncelle
    await fs.writeFile(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2))
    
    // Footer varsa pages.json'a kaydet
    if (footer) {
      const pagesPath = path.join(process.cwd(), 'content', 'pages.json')
      const pagesContent = await fs.readFile(pagesPath, 'utf-8')
      const pages = JSON.parse(pagesContent)
      
      pages.footer = footer
      
      await fs.writeFile(pagesPath, JSON.stringify(pages, null, 2))
    }
    
    return NextResponse.json({ success: true, config: updatedConfig })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}
