import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Localhost'ta admin'e izin ver
  const isLocalhost = request.headers.get('host')?.includes('localhost') || 
                      request.headers.get('host')?.includes('127.0.0.1')
  
  // Production'da /admin route'larını ana sayfaya yönlendir
  if (!isLocalhost && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
