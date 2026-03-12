import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { SiteConfig } from '@/types'

interface CTASectionProps {
  config: SiteConfig
  pageContent?: any
}

export function CTASection({ config, pageContent }: CTASectionProps) {
  if (!pageContent?.homepage?.cta?.title) {
    return null
  }

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {pageContent.homepage.cta.title}
          </h2>
          {pageContent.homepage.cta.description && (
            <p className="mt-6 text-lg text-gray-900 md:text-xl">
              {pageContent.homepage.cta.description}
            </p>
          )}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/teklif-al" prefetch={true}>
              <Button size="lg" className="w-full sm:w-auto">
                {pageContent.homepage.cta.primaryButtonText}
              </Button>
            </Link>
            <Link href={`tel:${config.contact.phone}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {config.contact.phone}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
