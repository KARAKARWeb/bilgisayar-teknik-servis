import { FAQItem } from '@/components/shared/faq-item'

interface FAQSectionProps {
  faqs: any[]
  title?: string
  description?: string
  category?: string
  pageContent?: any
}

export function FAQSection({ faqs, title, description, category, pageContent }: FAQSectionProps) {
  const filteredFAQs = category
    ? faqs.filter((faq) => faq.category === category && faq.active)
    : faqs.filter((faq) => faq.active)

  const displayFAQs = filteredFAQs.slice(0, 10)
  
  // İlk 5 ve son 5'i ayır
  const leftFAQs = displayFAQs.slice(0, 5)
  const rightFAQs = displayFAQs.slice(5, 10)

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {title || pageContent?.homepage?.faq?.title}
          </h2>
          <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
            {pageContent?.homepage?.faq?.subtitle}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sol Kolon - İlk 5 */}
          <div className="space-y-4">
            {leftFAQs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} defaultOpen={false} />
            ))}
          </div>

          {/* Sağ Kolon - Son 5 */}
          <div className="space-y-4">
            {rightFAQs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} defaultOpen={false} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
