import type { SiteConfig } from '@/types'

interface StatsSectionProps {
  config: SiteConfig
}

export function StatsSection({ config }: StatsSectionProps) {
  const stats = [
    {
      value: config.business.projectCount,
      label: 'Tamamlanan Proje',
    },
    {
      value: config.business.clientCount,
      label: 'Mutlu Müşteri',
    },
    {
      value: config.business.experienceYears,
      label: 'Yıllık Deneyim',
    },
    {
      value: config.business.satisfactionRate,
      label: 'Memnuniyet Oranı',
    },
  ]

  return (
    <section className="border-y border-gray-200 bg-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-h2-desktop font-semibold text-black md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-900 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
