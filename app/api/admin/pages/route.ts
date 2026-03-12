import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'content', 'pages.json')
    
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const pages = JSON.parse(fileContent)
    
    if (data.pageKey && data.data) {
      pages[data.pageKey] = data.data
    } else if (data.pageKey) {
      pages[data.pageKey] = {
        ...pages[data.pageKey],
        content: data.content,
        seo: data.seo,
      }
    } else {
      Object.assign(pages, data)
    }
    
    await fs.writeFile(filePath, JSON.stringify(pages, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating pages:', error)
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'content', 'pages.json')
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating pages:', error)
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 })
  }
}
