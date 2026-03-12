import { Check, Sparkles } from 'lucide-react'
import type { PricePackage } from '@/types'

interface PricingSectionProps {
  packages: PricePackage[]
  pageContent?: any
}

export function PricingSection({ packages, pageContent }: PricingSectionProps) {
  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        {(pageContent?.homepage?.pricing?.title || pageContent?.homepage?.pricing?.subtitle) && (
          <div className="mb-12 text-center">
            {pageContent?.homepage?.pricing?.title && (
              <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
                {pageContent.homepage.pricing.title}
              </h2>
            )}
            {pageContent?.homepage?.pricing?.subtitle && (
              <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
                {pageContent.homepage.pricing.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group relative flex flex-col rounded-2xl border-2 p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                pkg.featured 
                  ? 'border-gray-300 bg-gray-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-[#006BFF] px-4 py-1.5 shadow-lg">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      Popüler
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    {pkg.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-black">
                      {pkg.price.toLocaleString('tr-TR')}₺
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {pkg.period || 'tek seferlik'}
                  </p>
                </div>

                {pkg.features && pkg.features.length > 0 && (
                  <div className="space-y-3 mb-8">
                    {pkg.features.slice(0, 6).map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full p-0.5 bg-black">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm leading-relaxed text-gray-700">
                          {typeof feature === 'string' ? feature : feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {pageContent?.homepage?.pricing?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              {pageContent.homepage.pricing.description}
            </p>
            <a href="/fiyatlarimiz" className="inline-flex items-center justify-center rounded-lg bg-[#006BFF] text-white hover:bg-[#0056CC] px-8 py-3 text-base font-medium transition-colors">
              Tümünü Görüntüle
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
