import { Zap, Shield, Smartphone, Globe, TrendingUp, Headphones } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const icons = [Zap, Shield, Smartphone, Globe, TrendingUp, Headphones]

export function FeaturesSection({ pageContent }: { pageContent?: any }) {
  const features = pageContent?.homepage?.features?.items
  
  if (!features || features.length === 0) {
    return null
  }
  
  const filteredFeatures = features.filter((f: any) => f.title || f.description)
  
  if (filteredFeatures.length === 0) {
    return null
  }
  
  const featuresWithIcons = filteredFeatures.map((feature: any, index: number) => ({
    ...feature,
    icon: icons[index] || Zap
  }))
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        {pageContent?.homepage?.features?.title && (
          <div className="mb-12 text-center">
            <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
              {pageContent.homepage.features.title}
            </h2>
            {pageContent.homepage.features.subtitle && (
              <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
                {pageContent.homepage.features.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuresWithIcons.map((feature: any, index: number) => {
            return (
              <div
                key={`feature-${index}`}
                className="rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-lg"
              >
                <div className="flex flex-col space-y-1.5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-2xl font-bold text-black">{index + 1}</span>
                  </div>
                  {feature.title && <CardTitle>{feature.title}</CardTitle>}
                  {feature.description && <CardDescription>{feature.description}</CardDescription>}
                </div>
              </div>
            )
          })}
        </div>

        {pageContent?.homepage?.features?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              {pageContent.homepage.features.description}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
