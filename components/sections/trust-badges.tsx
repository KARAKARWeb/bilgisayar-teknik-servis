'use client'

import { MapPin, Monitor, Clock, Users, Briefcase } from 'lucide-react'

interface TrustBadgesSectionProps {
  pageContent?: any
}

export function TrustBadgesSection({ pageContent }: TrustBadgesSectionProps) {
  const trustBadges = pageContent?.homepage?.hero?.trustBadges

  if (!trustBadges || trustBadges.length === 0) {
    return null
  }

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, var(--geist-background) 0%, var(--accents-1) 100%)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustBadges.map((badge: any, index: number) => {
            const iconMap: { [key: string]: any } = {
              'map-pin': MapPin,
              'monitor': Monitor,
              'clock': Clock,
              'users': Users,
              'briefcase': Briefcase,
            }
            const Icon = iconMap[badge.icon] || MapPin
            
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white border rounded-xl transition-all duration-300 group"
                style={{
                  borderColor: 'rgb(229, 229, 229)',
                  background: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4d4d4'
                  e.currentTarget.style.background = 'var(--ds-background-200, #f5f5f5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(229, 229, 229)'
                  e.currentTarget.style.background = '#fff'
                }}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Icon className="h-7 w-7 text-[#006bff]" aria-hidden="true" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
