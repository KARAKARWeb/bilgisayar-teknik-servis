import { getFAQ } from '@/lib/content'
import { FAQListClient } from './list-client'

export default async function AdminFAQPage() {
  const faqs = await getFAQ()

  return <FAQListClient faqs={faqs} />
}
