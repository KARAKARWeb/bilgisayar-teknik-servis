import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateContactEmailHTML } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { getSiteConfig } from '@/lib/config'

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'
  
  try {
    await limiter.check(5, ip)
  } catch {
    return NextResponse.json({ error: 'Çok fazla istek gönderildi' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { name, phone, projectType, pageCount, features, estimatedPrice } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Ad soyad ve telefon gerekli' }, { status: 400 })
    }

    const config = await getSiteConfig()
    const featuresText = features && features.length > 0 
      ? features.join(', ') 
      : 'Seçilmedi'

    const emailData = {
      name,
      phone,
      email: '-',
      message: `
Proje Tipi: ${projectType}
Sayfa Sayısı: ${pageCount}
Seçilen Özellikler: ${featuresText}
Tahmini Fiyat: ${estimatedPrice.toLocaleString('tr-TR')}₺

Bu talep fiyat hesaplama formundan otomatik olarak gönderilmiştir.
      `.trim(),
      service: 'Fiyat Hesaplama Talebi'
    }

    const emailContent = generateContactEmailHTML(emailData, config.site.name)

    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@example.com',
      subject: `Fiyat Hesaplama Talebi - ${name}`,
      html: emailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form gönderim hatası:', error)
    return NextResponse.json({ error: 'Form gönderilemedi' }, { status: 500 })
  }
}
