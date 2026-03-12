import Link from 'next/link'
import { Layout, Code2, ShoppingCart, ArrowUpRight } from 'lucide-react'
import type { Service } from '@/types'

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // İlk 3 hizmeti al (featured olanlar)
  const featuredServices = services?.filter(s => s.featured).slice(0, 3) || []
  
  if (!services || services.length === 0) {
    return null
  }
  
  const iconMap = {
    'layout': Layout,
    'code2': Code2,
    'shopping-cart': ShoppingCart,
  }

  return (
    <section className="relative border-t border-gray-200 bg-white py-16 md:py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-h2-desktop font-semibold text-black md:text-5xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-xl text-gray-900">
            Dijital dünyada başarınız için ihtiyacınız olan her şey
          </p>
        </div>

        {/* Powered By Label - Ortada */}
        <div className="relative mb-12 flex justify-center">
          <div className="rounded-lg bg-gray-800 px-6 py-3 text-white">
            <span className="text-sm font-medium">KARAKAR Web</span>
          </div>
        </div>

        {/* Grid Lines - Decorative */}
        <div className="relative">
          {/* Vertical lines from center */}
          <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-gray-300 to-transparent" />
          
          <div className="grid gap-8 md:grid-cols-3">
            {featuredServices.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Layout
              
              return (
                <Link 
                  key={service.id} 
                  href={`/${service.slug}`}
                  className="group relative block"
                >
                  {/* Connecting line to center */}
                  {index === 0 && (
                    <div className="absolute -top-24 right-0 h-24 w-1/2 border-r border-t border-blue-200" />
                  )}
                  {index === 1 && (
                    <div className="absolute -top-24 left-1/2 h-24 w-px -translate-x-1/2 bg-gray-200" />
                  )}
                  {index === 2 && (
                    <div className="absolute -top-24 left-0 h-24 w-1/2 border-l border-t border-orange-200" />
                  )}

                  <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-lg">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center">
                      <Icon className="h-12 w-12 text-black" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-black">
                      {service.name}
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </h3>
                    
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
