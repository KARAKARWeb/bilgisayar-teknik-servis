import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json()
    
    const filePath = path.join(process.cwd(), 'content/services.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const services = JSON.parse(fileContent)
    
    const filteredServices = services.filter((s: any) => !ids.includes(s.id))
    
    await fs.writeFile(filePath, JSON.stringify(filteredServices, null, 2))
    
    return NextResponse.json({ success: true, deleted: ids.length })
  } catch (error) {
    console.error('Bulk delete error:', error)
    return NextResponse.json({ error: 'Toplu silme başarısız' }, { status: 500 })
  }
}
