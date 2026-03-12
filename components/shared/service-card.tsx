import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    slug: string
    description: string
    icon?: string
    features?: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/${service.slug}`} className="group">
      <div className="h-full rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-black group-hover:underline">
            {service.name}
          </h3>
          <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        
        <p className="text-gray-900 mb-4">{service.description}</p>
        
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-900">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
