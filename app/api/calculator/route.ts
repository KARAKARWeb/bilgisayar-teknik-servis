import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'
  
  try {
    await limiter.check(10, ip)
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { 
      websiteType, 
      pageCount, 
      features, 
      design, 
      hosting, 
      seo, 
      maintenance 
    } = body

    let basePrice = 0

    switch (websiteType) {
      case 'kurumsal':
        basePrice = 15000
        break
      case 'e-ticaret':
        basePrice = 25000
        break
      case 'blog':
        basePrice = 8000
        break
      case 'portfolio':
        basePrice = 10000
        break
      default:
        basePrice = 12000
    }

    const pagePrice = Math.max(0, (pageCount - 5)) * 1000

    let featuresPrice = 0
    if (features?.includes('cms')) featuresPrice += 3000
    if (features?.includes('multilang')) featuresPrice += 4000
    if (features?.includes('payment')) featuresPrice += 5000
    if (features?.includes('crm')) featuresPrice += 6000
    if (features?.includes('api')) featuresPrice += 4000

    let designPrice = 0
    if (design === 'custom') designPrice = 5000
    else if (design === 'premium') designPrice = 3000

    const hostingPrice = hosting ? 1200 : 0
    const seoPrice = seo ? 2500 : 0
    const maintenancePrice = maintenance ? 1500 : 0

    const totalPrice = basePrice + pagePrice + featuresPrice + designPrice + hostingPrice + seoPrice + maintenancePrice

    const breakdown = {
      basePrice,
      pagePrice,
      featuresPrice,
      designPrice,
      hostingPrice,
      seoPrice,
      maintenancePrice,
      totalPrice,
      currency: 'TRY',
    }

    return NextResponse.json(breakdown)
  } catch (error) {
    console.error('Calculator error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
