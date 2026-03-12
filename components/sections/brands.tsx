'use client'

const BrandLogo = ({ name }: { name: string }) => {
  const logos: Record<string, React.ReactElement> = {
    'Dell': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#007DB8">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#007DB8">DELL</text>
      </svg>
    ),
    'HPE': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#01A982">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#01A982">HPE</text>
      </svg>
    ),
    'Lenovo': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#E2231A">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#E2231A">Lenovo</text>
      </svg>
    ),
    'HP': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#0096D6">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0096D6">HP</text>
      </svg>
    ),
    'Cisco': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#049FD9">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#049FD9">Cisco</text>
      </svg>
    ),
    'IBM': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#006699">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#006699">IBM</text>
      </svg>
    ),
    'Fujitsu': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#E60012">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#E60012">Fujitsu</text>
      </svg>
    ),
    'Inspur': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#0066CC">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0066CC">Inspur</text>
      </svg>
    ),
    'Apple': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#000000">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    'Monster': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#FF0000">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FF0000">Monster</text>
      </svg>
    ),
    'MSI': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#FF0000">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FF0000">MSI</text>
      </svg>
    ),
    'Supermicro': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#6EBE44">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#6EBE44">Supermicro</text>
      </svg>
    ),
    'ASUS': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#000000">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000000">ASUS</text>
      </svg>
    ),
    'Huawei': (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="#FF0000">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FF0000">Huawei</text>
      </svg>
    ),
  }

  return logos[name] || null
}

export function BrandsSection({ pageContent }: { pageContent?: any }) {
  const brands = [
    'Dell',
    'HPE',
    'Lenovo',
    'HP',
    'Cisco',
    'IBM',
    'Fujitsu',
    'Inspur',
    'Apple',
    'Monster',
    'MSI',
    'Supermicro',
    'ASUS',
    'Huawei',
  ]

  return (
    <section className="border-t border-gray-200 bg-white py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {pageContent?.homepage?.technologies?.title || 'Markalar'}
          </h2>
          {pageContent?.homepage?.technologies?.subtitle && (
            <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
              {pageContent.homepage.technologies.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white border border-gray-200 transition-all group-hover:border-black group-hover:shadow-lg">
                <BrandLogo name={brand} />
              </div>
              <span className="text-sm font-medium text-gray-900">{brand}</span>
            </div>
          ))}
        </div>

        {pageContent?.homepage?.technologies?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              {pageContent.homepage.technologies.description}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
