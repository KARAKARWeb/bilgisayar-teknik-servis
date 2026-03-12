import { SSSduzenForm } from './form'
import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SSSduzenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const filePath = path.join(process.cwd(), 'content', 'faq.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const faqs = JSON.parse(fileContent)
  const faq = faqs.find((f: any) => f.id === id)

  if (!faq) {
    notFound()
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">SSS Düzenle</h1>
      <SSSduzenForm faq={faq} />
    </div>
  )
}
