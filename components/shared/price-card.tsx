import { Check } from 'lucide-react'

interface PriceCardProps {
  pkg: {
    id: string
    name: string
    description: string
    price: number
    period?: string
    featured?: boolean
    features?: string[]
    cta?: {
      text: string
      link: string
    }
  }
}

export function PriceCard({ pkg }: PriceCardProps) {
  return (
    <div
      className={`rounded-lg border-2 p-8 ${
        pkg.featured
          ? 'border-black bg-black text-white'
          : 'border-gray-200 bg-white'
      }`}
    >
      {pkg.featured && (
        <div className="mb-4">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
            Popüler
          </span>
        </div>
      )}

      <h3 className={`text-2xl font-bold ${pkg.featured ? 'text-white' : 'text-black'}`}>
        {pkg.name}
      </h3>
      <p className={`mt-2 ${pkg.featured ? 'text-gray-300' : 'text-gray-900'}`}>
        {pkg.description}
      </p>

      <div className="mt-6">
        <span className={`text-4xl font-bold ${pkg.featured ? 'text-white' : 'text-black'}`}>
          {pkg.price.toLocaleString('tr-TR')}₺
        </span>
        {pkg.period && (
          <span className={`ml-2 ${pkg.featured ? 'text-gray-300' : 'text-gray-900'}`}>
            / {pkg.period}
          </span>
        )}
      </div>

      {pkg.features && pkg.features.length > 0 && (
        <ul className="mt-8 space-y-4">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className={`h-5 w-5 flex-shrink-0 ${pkg.featured ? 'text-white' : 'text-black'}`} />
              <span className={pkg.featured ? 'text-gray-200' : 'text-gray-900'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <a
          href={pkg.cta?.link || '/teklif-al'}
          className={`block w-full rounded-lg px-6 py-3 text-center font-semibold transition-colors ${
            pkg.featured
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {pkg.cta?.text || 'Teklif Al'}
        </a>
      </div>
    </div>
  )
}
