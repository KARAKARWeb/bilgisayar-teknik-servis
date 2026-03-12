import { ImageResponse } from 'next/og'
import { getSiteConfig } from '@/lib/config'

export const runtime = 'edge'
export const alt = 'Web Tasarım'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const config = await getSiteConfig()
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold' }}>
          {config.site.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 20, opacity: 0.8 }}>
          {config.seo.metaDescription}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
