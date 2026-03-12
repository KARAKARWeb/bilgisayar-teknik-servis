import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

interface RegionsSectionProps {
  regions: any[]
  title?: string
  description?: string
  pageContent?: any
}

export function RegionsSection({ regions, title, description, pageContent }: RegionsSectionProps) {
  const featuredRegions = regions.slice(0, 5)

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {title || pageContent?.homepage?.regions?.title}
          </h2>
          <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
            {description || pageContent?.homepage?.regions?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {featuredRegions.map((region) => (
            <article
              key={region.id}
              className="rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col"
            >
              <div className="flex flex-col items-stretch justify-start p-4 flex-1">
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="text-sm text-gray-900">{region.city}</p>
                  <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <Link
                  href={`/${region.slug}`}
                  className="text-xl font-semibold text-black hover:underline mb-4"
                >
                  {region.name}
                </Link>
                {region.content && (
                  <p className="text-sm text-gray-900 leading-relaxed line-clamp-2">
                    {typeof region.content === 'string' 
                      ? region.content.replace(/<[^>]*>/g, '').substring(0, 70) + '...'
                      : region.content.main?.replace(/<[^>]*>/g, '').substring(0, 70) + '...'
                    }
                  </p>
                )}
              </div>
              <Link
                href={`/${region.slug}`}
                className="block w-full py-3 px-6 bg-gray-100 text-center text-sm font-medium text-gray-900 hover:bg-blue-600 hover:text-white transition-colors mt-auto"
              >
                Bölgeyi İncele
              </Link>
            </article>
          ))}
        </div>

        {pageContent?.homepage?.regions?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              {pageContent.homepage.regions.description}
            </p>
          </div>
        )}

        {regions.length > 6 && (
          <div className="mt-8 text-center">
            <Link
              href="/hizmet-bolgeleri"
              className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Tüm Bölgeleri Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
