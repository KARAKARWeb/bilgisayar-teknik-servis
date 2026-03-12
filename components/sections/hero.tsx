import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, MapPin, Monitor, Clock, Users, Briefcase } from 'lucide-react'
import type { SiteConfig } from '@/types'

interface HeroSectionProps {
  config: SiteConfig
  pageContent?: any
}

export function HeroSection({ config, pageContent }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-start flex-initial intro-module__l-DIkW__root border-b border-dashed border-gray-300 relative overflow-hidden" role="banner" aria-label="Ana sayfa hero bölümü">
      {/* Vercel-style Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/70 to-white" />
      </div>
      <div className="intro-module__l-DIkW__header">
        <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="top" data-side="left" style={{ '--line-fade-stop': '50%' } as React.CSSProperties} />
        <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="top" data-side="right" style={{ '--line-fade-stop': '50%' } as React.CSSProperties} />
      </div>
      
      <div className="intro-module__l-DIkW__intro intro-module__l-DIkW__gridLineTop">
        <svg aria-hidden="true" className="intro-module__l-DIkW__gridCircle" data-side="top-left" fill="none" height="75" viewBox="0 0 75 75" width="75">
          <path 
            d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74" 
            opacity="var(--line-opacity)" 
            stroke="url(#paint0_angular_25_2122)" 
            strokeDasharray="2 2"
          />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(37.5 37.5) rotate(90) scale(36.5)" gradientUnits="userSpaceOnUse" id="paint0_angular_25_2122" r="1">
              <stop />
              <stop offset="0.5" stopOpacity="0.34" />
              <stop offset="1" />
            </radialGradient>
          </defs>
        </svg>
        
        <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="true" data-offset="true" data-side="left" />
        
        <h1 className="intro-module__l-DIkW__title intro-module__l-DIkW__gridLineBottom">
          {pageContent?.homepage?.hero?.title}
          <svg aria-hidden="true" className="intro-module__l-DIkW__gridCircle" data-side="bottom-right" fill="none" height="75" viewBox="0 0 75 75" width="75">
            <path 
              d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74" 
              opacity="var(--line-opacity)" 
              stroke="url(#paint0_angular_25_2122)" 
              strokeDasharray="2 2"
            />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="translate(37.5 37.5) rotate(90) scale(36.5)" gradientUnits="userSpaceOnUse" id="paint0_angular_25_2122" r="1">
                <stop />
                <stop offset="0.5" stopOpacity="0.34" />
                <stop offset="1" />
              </radialGradient>
            </defs>
          </svg>
        </h1>
        
        {pageContent?.homepage?.hero?.subtitle && (
          <div className="intro-module__l-DIkW__subtitle intro-module__l-DIkW__gridLineBottom">
            <p>{pageContent.homepage.hero.subtitle}</p>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-start flex-initial intro-module__l-DIkW__footer intro-module__l-DIkW__gridLineBottom">
          <div className="flex flex-col items-center justify-start gap-4 flex-initial intro-module__l-DIkW__buttons">
            <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="true" data-offset="true" data-side="left" />
            
            <div className="flex flex-row items-stretch justify-start gap-4 flex-initial">
              {pageContent?.homepage?.hero?.whatsappText && (
                <Link 
                  href={config.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-none m-0 p-0 border-0 align-baseline no-underline group/trigger relative cursor-pointer select-none transform translate-z-0 flex text-[var(--themed-fg,_var(--ds-background-100))] bg-[var(--themed-bg,_var(--ds-gray-1000))] font-medium max-w-full items-center justify-center transition-[border-color,background,color,transform,box-shadow] duration-[150ms] ease-in-out [&_svg]:shrink-0 [--x-padding:14px] [--height:48px] pl-[var(--x-padding)] pr-[var(--x-padding)] text-base leading-6 rounded-[8px] h-[var(--height)] hover:bg-[hsl(0,0%,22%)]" 
                  style={{ '--geist-icon-size': '16px' } as React.CSSProperties}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span className="truncate inline-block">WhatsApp</span>
                </Link>
              )}
              {pageContent?.homepage?.hero?.phoneText && (
                <Link 
                  href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`}
                  className="outline-none m-0 p-0 border-0 align-baseline no-underline group/trigger relative cursor-pointer select-none transform translate-z-0 flex text-[var(--themed-fg,_var(--ds-gray-1000))] bg-[var(--themed-bg,_var(--ds-background-100))] font-medium max-w-full items-center justify-center transition-[border-color,background,color,transform,box-shadow] duration-[150ms] ease-in-out [&_svg]:shrink-0 [--x-padding:14px] [--height:48px] pl-[var(--x-padding)] pr-[var(--x-padding)] shadow-[0_0_0_1px_var(--ds-gray-400)] text-base leading-6 rounded-[8px] h-[var(--height)] hover:bg-[var(--ds-gray-100)]" 
                  style={{ '--geist-icon-size': '16px' } as React.CSSProperties}
                >
                  <span className="truncate inline-block px-1.5">{pageContent.homepage.hero.phoneText}</span>
                </Link>
              )}
            </div>
            
            <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="true" data-offset="true" data-side="right" />
            
            {/* Hizmet Verilen İller */}
            {pageContent?.homepage?.hero?.cities && pageContent.homepage.hero.cities.filter((city: any) => city.enabled).length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 px-4">
                {pageContent.homepage.hero.cities
                  .filter((city: any) => city.enabled)
                  .map((city: any, index: number) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-default"
                    >
                      <MapPin className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900">{city.name}</span>
                    </div>
                  ))}
              </div>
            )}
            
            <svg aria-hidden="true" className="intro-module__l-DIkW__gridCircle" data-side="bottom-right" fill="none" height="75" viewBox="0 0 75 75" width="75">
              <path 
                d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74" 
                opacity="var(--line-opacity)" 
                stroke="url(#paint0_angular_25_2122)" 
                strokeDasharray="2 2"
              />
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(37.5 37.5) rotate(90) scale(36.5)" gradientUnits="userSpaceOnUse" id="paint0_angular_25_2122" r="1">
                  <stop />
                  <stop offset="0.5" stopOpacity="0.34" />
                  <stop offset="1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div aria-hidden="true" className="intro-module__l-DIkW__gridContainerLine" data-fade="true" data-offset="true" data-side="right" />
      </div>
    </section>
  )
}
