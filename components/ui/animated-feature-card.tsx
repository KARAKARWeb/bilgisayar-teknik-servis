'use client'

import Link from 'next/link'

interface AnimatedFeatureCardProps {
  title: string
  description: string
  href: string
  variant?: 'default' | 'code' | 'rocket' | 'ai' | 'ecommerce' | 'server' | 'onsite' | 'remote' | 'corporate' | 'individual' | 'emergency'
}

export function AnimatedFeatureCard({ title, description, href, variant = 'default' }: AnimatedFeatureCardProps) {
  return (
    <Link 
      href={href}
      className="features-card"
      data-variant="callout"
    >
      {/* Illustration Container */}
      <div data-illustration="true">
        <div className="animated-streaming-root">
          {/* Grid Background */}
          <svg className="animated-streaming-grid absolute inset-0 w-full h-full" height="258" viewBox="0 0 392 258" width="392">
            <g opacity="0.08" stroke="var(--geist-foreground)" strokeDasharray="1 1">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`h-${i}`} x2="392" y1={15.5 + i * 16} y2={15.5 + i * 16} />
              ))}
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={`v-${i}`} x1={11.9999 + i * 16} x2={11.9999 + i * 16} y1="0" y2="256" />
              ))}
            </g>
          </svg>

          {/* Window Preview */}
          <div className="animated-streaming-window">
            {/* Toolbar */}
            <div data-toolbar="true">
              <div data-control="true"></div>
              <div data-control="true"></div>
              <div data-control="true"></div>
            </div>

            {/* Content */}
            <div data-content="true">
              {variant === 'default' && (
                <div className="flex flex-row items-stretch justify-start gap-4 flex-initial">
                  <div data-column-first="true" className="flex flex-col items-stretch justify-start gap-2 flex-initial">
                    <div data-avatar="true" style={{ borderRadius: '16px', width: '16px', height: '16px' }}>
                      <svg aria-label="Vercel logomark" height="10" role="img" style={{ width: 'auto', overflow: 'visible' }} viewBox="0 0 74 64">
                        <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="var(--accents-3)"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col items-stretch justify-start gap-1 flex-initial">
                      <div data-line="true" data-size="full"></div>
                      <div data-line="true" data-size="half" data-variant="dim"></div>
                      <div data-line="true" data-variant="dim"></div>
                      <div data-line="true" data-variant="dim"></div>
                      <div data-line="true" data-size="half" data-variant="dim"></div>
                    </div>
                  </div>
                  <div data-column-second="true">
                    <div data-header="true" className="flex flex-row items-center justify-between flex-initial">
                      <div data-avatar="true"></div>
                      <div data-btn="true"></div>
                    </div>
                    <div data-nav="true" className="flex flex-row items-center justify-start gap-1 flex-initial">
                      <div data-line="true" style={{ width: '16px' }}></div>
                      <div data-line="true" data-variant="dim"></div>
                    </div>
                    <div data-rectangles="true">
                      <div>
                        <div data-rectangle="true" style={{ height: '32px' }}></div>
                        <div data-rectangle="true" style={{ height: '32px' }}></div>
                        <div data-rectangle="true" style={{ height: '32px' }}></div>
                      </div>
                      <div>
                        <div data-rectangle="true" data-size="large" style={{ height: '48px' }}></div>
                        <div data-rectangle="true" data-size="large" style={{ height: '48px' }}></div>
                        <div data-rectangle="true" data-size="large" style={{ height: '48px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {variant === 'code' && (
                <div className="flex flex-col items-center justify-center h-full px-8 py-6">
                  <div className="w-full space-y-2 font-mono text-xs">
                    <div className="flex gap-2"><span className="text-purple-400">const</span> <span className="text-blue-400">app</span> <span className="text-gray-400">=</span> <span className="text-green-400">express()</span></div>
                    <div className="flex gap-2 pl-4"><span className="text-gray-400">//</span> <span className="text-gray-500">API endpoint</span></div>
                    <div className="flex gap-2"><span className="text-purple-400">app</span>.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/api'</span>, <span className="text-blue-400">handler</span>)</div>
                    <div className="h-4"></div>
                    <div className="flex gap-2"><span className="text-purple-400">function</span> <span className="text-blue-400">handler</span>() {'{'}</div>
                    <div className="flex gap-2 pl-4"><span className="text-purple-400">return</span> <span className="text-green-400">{'{ success: true }'}</span></div>
                    <div className="flex gap-2">{'}'}</div>
                  </div>
                </div>
              )}

              {variant === 'rocket' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400">
                    <path d="M12 2L12 15M12 2L9 5M12 2L15 5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15L9 18L9 22L12 20L15 22L15 18L12 15Z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.05"/>
                    <ellipse cx="12" cy="8" rx="2" ry="3" opacity="0.3"/>
                    <path d="M7 12L5 14L5 16L7 15" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 12L19 14L19 16L17 15" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="1" fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>
              )}

              {variant === 'ai' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400">
                    <path d="M12 3C8 3 5 6 5 10C5 12 6 14 7 15L7 19C7 20 8 21 9 21L15 21C16 21 17 20 17 19L17 15C18 14 19 12 19 10C19 6 16 3 12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="10" r="0.5" fill="currentColor"/>
                    <circle cx="15" cy="10" r="0.5" fill="currentColor"/>
                    <path d="M9 13C9 13 10 14 12 14C14 14 15 13 15 13" strokeLinecap="round"/>
                    <path d="M8 8L8 7M12 6L12 5M16 8L16 7" strokeLinecap="round" opacity="0.5"/>
                    <path d="M7 11C6 11 5 10.5 5 10M17 11C18 11 19 10.5 19 10" strokeLinecap="round" opacity="0.3"/>
                    <rect x="9" y="19" width="6" height="2" rx="1" opacity="0.2" fill="currentColor"/>
                  </svg>
                </div>
              )}

              {variant === 'ecommerce' && (
                <div className="flex flex-row items-stretch justify-center gap-2 h-full px-4 py-6">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-gray-100 rounded-lg h-16 w-full"></div>
                    <div data-line="true" data-size="full"></div>
                    <div data-line="true" data-size="half"></div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-gray-100 rounded-lg h-16 w-full"></div>
                    <div data-line="true" data-size="full"></div>
                    <div data-line="true" data-size="half"></div>
                  </div>
                </div>
              )}

              {variant === 'server' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400">
                    <path d="M18 10C20 10 22 11 22 13C22 15 20 16 18 16L6 16C4 16 2 15 2 13C2 11 4 10 6 10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10C6 7 8 5 12 5C16 5 18 7 18 10" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="1.5" opacity="0.3" fill="currentColor"/>
                    <path d="M12 14L12 19M9 19L15 19" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="13" r="0.5" fill="currentColor" opacity="0.5"/>
                    <circle cx="16" cy="13" r="0.5" fill="currentColor" opacity="0.5"/>
                    <path d="M5 13L5 14M19 13L19 14" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                </div>
              )}

              {variant === 'onsite' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-400">
                    {/* Teknisyen figürü */}
                    <circle cx="12" cy="7" r="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13C8 11.5 9.5 10 12 10C14.5 10 16 11.5 16 13L16 17" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Alet çantası */}
                    <rect x="9" y="16" width="6" height="4" rx="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                    <path d="M10.5 16L10.5 15C10.5 14.5 11 14 11.5 14L12.5 14C13 14 13.5 14.5 13.5 15L13.5 16" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
                    {/* Lokasyon işareti */}
                    <path d="M18 8C18 6 17 4 15 4M6 8C6 6 7 4 9 4" strokeLinecap="round" opacity="0.5"/>
                    <circle cx="12" cy="18" r="0.5" fill="currentColor" opacity="0.6"/>
                    {/* Araçlar */}
                    <path d="M7 11L6 12M17 11L18 12" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>
              )}

              {variant === 'remote' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-400">
                    {/* Bilgisayar ekranı */}
                    <rect x="4" y="5" width="16" height="11" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 20L16 20" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16L12 20" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Uzaktan bağlantı sinyali */}
                    <circle cx="12" cy="10" r="1.5" opacity="0.6" fill="currentColor"/>
                    <path d="M9 10C9 8.5 10 7.5 12 7.5C14 7.5 15 8.5 15 10" strokeLinecap="round" opacity="0.5"/>
                    <path d="M7.5 10C7.5 7 9 5 12 5C15 5 16.5 7 16.5 10" strokeLinecap="round" opacity="0.35"/>
                    {/* Cursor/pointer */}
                    <path d="M14 12L15 13L14.5 13.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                  </svg>
                </div>
              )}

              {variant === 'individual' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-400">
                    {/* Kullanıcı figürü */}
                    <circle cx="12" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20C6 16 8.5 14 12 14C15.5 14 18 16 18 20" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Ev/kişisel simgesi */}
                    <path d="M12 3L12 5" strokeLinecap="round" opacity="0.5"/>
                    <path d="M8 5L9 6M16 5L15 6" strokeLinecap="round" opacity="0.4"/>
                    {/* Destek/yardım işareti */}
                    <circle cx="17" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                    <path d="M17 9L17 10.5M17 11.5L17 11.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                    {/* Kişisel cihaz simgesi */}
                    <rect x="9" y="18" width="2" height="1" rx="0.3" opacity="0.5" fill="currentColor"/>
                    <rect x="13" y="18" width="2" height="1" rx="0.3" opacity="0.5" fill="currentColor"/>
                  </svg>
                </div>
              )}

              {variant === 'emergency' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-400">
                    {/* Hızlı müdahale/ambulans çapraz */}
                    <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Artı işareti (tıbbi/acil) */}
                    <path d="M12 8L12 16M8 12L16 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    {/* Hız çizgileri */}
                    <path d="M4 8L6 8M4 12L5 12M4 16L6 16" strokeLinecap="round" opacity="0.5"/>
                    <path d="M20 8L18 8M20 12L19 12M20 16L18 16" strokeLinecap="round" opacity="0.5"/>
                    {/* Aciliyet göstergesi */}
                    <path d="M12 4L12 3M16 6L17 5M18 10L19 10" strokeLinecap="round" opacity="0.4"/>
                    <path d="M12 20L12 21M8 18L7 19M6 14L5 14" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </div>
              )}

              {variant === 'corporate' && (
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-400">
                    {/* Bina/ofis */}
                    <rect x="6" y="4" width="12" height="16" rx="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Pencereler */}
                    <rect x="8" y="6" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="11" y="6" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="14" y="6" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="8" y="9" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="11" y="9" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="14" y="9" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="8" y="12" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="11" y="12" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    <rect x="14" y="12" width="2" height="2" opacity="0.5" fill="currentColor"/>
                    {/* Kapı */}
                    <rect x="10" y="16" width="4" height="4" opacity="0.6" fill="currentColor"/>
                    {/* IT/Network simgesi */}
                    <circle cx="12" cy="3" r="1" opacity="0.7" fill="currentColor"/>
                    <path d="M10 3L14 3" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Title & Description */}
      <div data-title="true" className="flex flex-row items-center justify-start gap-2 flex-initial">
        <span>{title}</span>
      </div>
      <div data-subtitle="true">{description}</div>
    </Link>
  )
}
