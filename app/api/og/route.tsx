import { ImageResponse } from 'next/og'
import { getSiteConfig } from '@/lib/config'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    
    const config = await getSiteConfig()

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: '80px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              {config.site.name}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#000',
                lineHeight: 1.2,
              }}
            >
              {title || config.seo.metaTitle}
            </div>
            {description && (
              <div
                style={{
                  fontSize: '32px',
                  color: '#666',
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '2px solid #eee',
              paddingTop: '32px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#666',
              }}
            >
              www.{config.site.domain}
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#666',
              }}
            >
              {config.site.city}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
