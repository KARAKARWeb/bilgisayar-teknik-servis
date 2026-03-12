import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Compress & optimize
    const optimized = await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer()

    // Save
    const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}.webp`
    const filepath = path.join(process.cwd(), 'public/uploads', filename)
    
    await writeFile(filepath, optimized)

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}`,
      size: optimized.length 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 })
  }
}
