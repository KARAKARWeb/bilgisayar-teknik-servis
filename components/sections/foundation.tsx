'use client'

import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card'
import styles from './foundation.module.css'

interface FoundationSectionProps {
  services: any[]
  pageContent?: any
  config: any
}

export function FoundationSection({ services, pageContent, config }: FoundationSectionProps) {
  const mainServices = services.slice(0, 3)

  return (
    <section className={styles.root}>
      <div className={styles.main}>
        <h2 className={styles.title} data-main-heading="true">
          {pageContent?.homepage?.services?.title}
        </h2>
        <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
          {pageContent?.homepage?.services?.subtitle}
        </p>
        
        <div className={styles.illustration}>
          <svg fill="none" height="264" role="img" viewBox="0 0 891 264" width="891" data-lines="true" aria-label="A bunch of connecting lines that form into the CPU, with the text Powered By on top of the the CPU. Gradient lines are animating along the drawn lines, dissolving into the CPU in the center.">
            <path d="M388 96L388 68C388 65.7909 386.209 64 384 64L310 64" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M349 150L73 150C70.7909 150 69 151.791 69 154L69 174" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M388 184L388 194C388 196.209 386.209 198 384 198L77 198C74.7909 198 73 199.791 73 202L73 264" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M412 96L412 0" stroke="url(#paint0_linear_341_27683)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M412 263.5L412 184" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px" style={{ transform: 'scale(-1)', transformOrigin: '50% 50%', transformBox: 'fill-box' }}></path>
            <path d="M508 96L508 88C508 85.7909 509.791 84 512 84L886 84C888.209 84 890 85.7909 890 88L890 264" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M436 96L436 0" stroke="url(#paint1_linear_341_27683)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M436 214L436 184" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px" style={{ transform: 'scale(-1)', transformOrigin: '50% 50%', transformBox: 'fill-box' }}></path>
            <path d="M460 96L460 64" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M460 239L460 184" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px" style={{ transform: 'scale(-1)', transformOrigin: '50% 50%', transformBox: 'fill-box' }}></path>
            <path d="M484 96L484 24C484 21.7909 485.791 20 488 20L554 20" stroke="url(#paint2_linear_341_27683)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M484 184L484 210C484 212.209 485.791 214 488 214L560 214" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <path d="M508 184L508 193C508 195.209 509.791 197 512 197L560 197" stroke="var(--geist-foreground)" strokeOpacity="0.1" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px"></path>
            <circle cx="460" cy="64" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="460" cy="64" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="308" cy="64" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="308" cy="64" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="69" cy="173" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="69" cy="173" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="436" cy="214" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="436" cy="214" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="460" cy="240" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="460" cy="240" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="560" cy="214" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="560" cy="214" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <circle cx="560" cy="197" fill="var(--geist-background)" r="4" opacity="1"></circle>
            <circle cx="560" cy="197" r="3.5" stroke="var(--geist-foreground)" strokeOpacity="0.1" opacity="1"></circle>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_341_27683" x1="412.5" x2="412.5" y1="-3.27835e-08" y2="96">
                <stop stopOpacity="0"></stop>
                <stop offset="1"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_341_27683" x1="436.5" x2="436.5" y1="-3.27835e-08" y2="96">
                <stop stopOpacity="0"></stop>
                <stop offset="1"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_341_27683" x1="554" x2="484" y1="20" y2="96">
                <stop stopOpacity="0"></stop>
                <stop offset="1"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="blue-pulse-1" x1="400" y1="83" x2="350" y2="133.75">
                <stop stopColor="#2EB9DF" stopOpacity="0"></stop>
                <stop offset="0.05" stopColor="#2EB9DF"></stop>
                <stop offset="1" stopColor="#2EB9DF" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="blue-pulse-2" x1="400" y1="83" x2="350" y2="133.75">
                <stop stopColor="#2EB9DF" stopOpacity="0"></stop>
                <stop offset="0.05" stopColor="#2EB9DF"></stop>
                <stop offset="1" stopColor="#2EB9DF" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="pink-pulse-1" x1="401.1862008330645" y1="100.8918625653896" x2="356.1287043041666" y2="150.57922431910265">
                <stop stopColor="#FF4A81" stopOpacity="0"></stop>
                <stop offset="0.030" stopColor="#FF4A81"></stop>
                <stop offset="0.27" stopColor="#DF6CF6"></stop>
                <stop offset="1" stopColor="#0196FF" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="pink-pulse-2" x1="490" y1="218.34567363077076" x2="483.3909595529258" y2="240.2624675789266">
                <stop stopColor="#FF4A81" stopOpacity="0"></stop>
                <stop offset="0.0564843" stopColor="#FF4A81"></stop>
                <stop offset="0.4616" stopColor="#DF6CF6"></stop>
                <stop offset="1" stopColor="#0196FF" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="orange-pulse-1" x1="360" y1="130" x2="400" y2="170">
                <stop stopColor="#FF7432" stopOpacity="0"></stop>
                <stop offset="0.0550784" stopColor="#FF7432"></stop>
                <stop offset="0.373284" stopColor="#F7CC4B"></stop>
                <stop offset="1" stopColor="#F7CC4B" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="orange-pulse-2" x1="408.0059802343603" y1="166.621192311286" x2="488.99084286915604" y2="229.43935714953113">
                <stop stopColor="#FF7432" stopOpacity="0"></stop>
                <stop offset="0.0531089" stopColor="#FF7432"></stop>
                <stop offset="0.415114" stopColor="#F7CC4B"></stop>
                <stop offset="1" stopColor="#F7CC4B" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>

          <div aria-hidden="true" className={`${styles.cpu} flex flex-col items-center justify-center flex-initial`}>
            <div data-cpu-shine="true"></div>
            <div data-connectors="true" data-side="left">
              <span data-connector="true"></span>
              <span data-connector="true"></span>
            </div>
            <div data-connectors="true" data-side="top">
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
            </div>
            <h2 data-text="true" style={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '24px', fontWeight: 600, lineHeight: 1.1, margin: 0 }}>{config?.site?.name || 'Web Tasarım'}</h2>
            <div data-connectors="true" data-side="bottom">
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
              <span data-connector="true"></span>
            </div>
            <div data-connectors="true" data-side="right">
              <span data-connector="true"></span>
              <span data-connector="true"></span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {mainServices.map((service) => {
            const variantMap: Record<string, 'default' | 'code' | 'rocket' | 'ai' | 'ecommerce' | 'server' | 'onsite' | 'remote' | 'corporate'> = {
              'web-tasarim': 'default',
              'web-yazilim': 'code',
              'seo': 'rocket',
              'yerinde-teknik-destek': 'onsite',
              'uzaktan-teknik-destek': 'remote',
              'kurumsal-it-destek': 'corporate'
            }
            
            return (
              <AnimatedFeatureCard
                key={service.id}
                title={service.name}
                description={service.description}
                href={`/${service.slug}`}
                variant={variantMap[service.slug] || 'default'}
              />
            )
          })}
        </div>

        {/* SEO Keywords - Cardların Altında */}
        {pageContent?.homepage?.services?.keywords && pageContent.homepage.services.keywords.length > 0 && (
          <div className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-3 list-none" role="list">
              {pageContent.homepage.services.keywords.map((keyword: string, index: number) => (
                <li key={index}>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-900">
                    {keyword}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Açıklama ve Buton - Cardların Altında */}
        {pageContent?.homepage?.services?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              {pageContent.homepage.services.description}
            </p>
            <a 
              href="/hizmetlerimiz" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-150"
            >
              Tümünü Görüntüle
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
