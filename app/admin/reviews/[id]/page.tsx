import { YorumDuzenForm } from './form'
import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function YorumDuzenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const filePath = path.join(process.cwd(), 'content', 'reviews.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const reviews = JSON.parse(fileContent)
  const review = reviews.find((r: any) => r.id === id)

  if (!review) {
    notFound()
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Yorum Düzenle</h1>
      <YorumDuzenForm review={review} />
    </div>
  )
}
