import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'
import { uploadLimiter } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      )
    }

    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    try {
      await uploadLimiter.check(10, ip)
    } catch {
      return NextResponse.json(
        { success: false, message: 'Çok fazla yükleme yaptınız. Lütfen 1 dakika bekleyin.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const size = formData.get('size') as string // '192' or '512'
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    if (!['192', '512'].includes(size)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz boyut. 192 veya 512 olmalı.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz dosya tipi. Sadece resim dosyaları yüklenebilir.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Resize and optimize with sharp
    const targetSize = parseInt(size)
    const processedBuffer = await sharp(buffer)
      .resize(targetSize, targetSize, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90 })
      .toBuffer()

    const filename = `icon-${size}.png`
    const filepath = join(process.cwd(), 'public/icons', filename)

    await writeFile(filepath, processedBuffer)

    return NextResponse.json({
      success: true,
      message: `${size}x${size} icon başarıyla yüklendi`,
      url: `/icons/${filename}`,
    })
  } catch (error) {
    console.error('PWA icon upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Icon yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
