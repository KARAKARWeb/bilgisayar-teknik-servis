import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface RegionCardProps {
  region: {
    id: string
    name: string
    slug: string
    city: string
    content?: {
      main?: string
    }
    services?: string[]
  }
}

export function RegionCard({ region }: RegionCardProps) {
  return (
    <Link
      href={`/${region.slug}`}
      className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <MapPin className="h-6 w-6 text-black flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black group-hover:underline">
            {region.name}
          </h3>
          <p className="mt-1 text-sm text-gray-900">{region.city}</p>
          
          {region.content?.main && (
            <p className="mt-4 text-gray-900 line-clamp-3">
              {region.content.main}
            </p>
          )}

          {region.services && region.services.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-black">Hizmetler:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {region.services.slice(0, 3).map((service, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-900"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
