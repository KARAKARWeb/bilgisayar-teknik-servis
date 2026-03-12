import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateQuoteEmailHTML, generateTechServiceEmailHTML } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { getSiteConfig } from '@/lib/config'

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    
    try {
      await limiter.check(5, ip)
    } catch {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      projectType, 
      budget, 
      deadline, 
      deviceType,
      issueType,
      urgency,
      serviceLocation,
      city,
      message, 
      honeypot 
    } = body

    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    const config = await getSiteConfig()
    let emailHTML: string

    // Teknik servis formu mu yoksa web tasarım formu mu kontrol et
    if (deviceType && issueType) {
      // Teknik servis formu
      if (!name || !email || !phone || !deviceType || !issueType || !urgency || !serviceLocation || !city) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      emailHTML = generateTechServiceEmailHTML({
        name,
        email,
        phone,
        deviceType,
        issueType,
        urgency,
        serviceLocation,
        city,
        message
      }, config.site.name)
    } else {
      // Web tasarım formu
      if (!name || !email || !phone || !projectType || !budget || !deadline || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      emailHTML = generateQuoteEmailHTML({
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        deadline,
        message
      }, config.site.name)
    }

    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'info@cayirovawebtasarim.com.tr',
      subject: `${config.site.name} - Yeni Teklif Talebi - ${name}`,
      html: emailHTML,
    })

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
    }

    return NextResponse.json({ 
      success: true,
      message: 'Teklif talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
    })
  } catch (error) {
    console.error('Quote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
