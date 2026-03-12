import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { services: orderData } = await request.json()
    
    const filePath = path.join(process.cwd(), 'content/services.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const services = JSON.parse(fileContent)
    
    // Sıralamayı uygula
    const orderedServices = orderData.map((item: { id: string; order: number }) => {
      return services.find((s: any) => s.id === item.id)
    }).filter(Boolean)
    
    // Kaydet
    await fs.writeFile(filePath, JSON.stringify(orderedServices, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reorder error:', error)
    return NextResponse.json({ error: 'Sıralama kaydedilemedi' }, { status: 500 })
  }
}
