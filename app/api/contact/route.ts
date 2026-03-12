import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, generateContactEmailHTML } from '@/lib/email'
import { contactLimiter } from '@/lib/rate-limit'
import { getSiteConfig } from '@/lib/config'

const contactSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
  privacy: z.boolean(),
  website: z.string().optional(), // Honeypot field
})

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
      await contactLimiter.check(5, ip)
    } catch {
      return NextResponse.json(
        { success: false, message: 'Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyin.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: true, message: 'Mesajınız alındı.' },
        { status: 200 }
      )
    }
    
    // Validate
    const validatedData = contactSchema.parse(body)
    
    // Get site config
    const config = await getSiteConfig()
    
    // Send email
    const emailHTML = generateContactEmailHTML(validatedData, config.site.name)
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'info@example.com',
      subject: `${config.site.name} - Yeni İletişim Formu - ${validatedData.name}`,
      html: emailHTML,
    })

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
