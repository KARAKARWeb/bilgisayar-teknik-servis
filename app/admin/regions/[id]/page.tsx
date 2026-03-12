import { BolgeDuzenForm } from './form'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export default async function BolgeDuzenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const filePath = path.join(process.cwd(), 'content', 'regions.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const regions = JSON.parse(fileContent)
  const region = regions.find((r: any) => r.id === id || r.slug === id)

  if (!region) {
    return <div className="p-8">Bölge bulunamadı</div>
  }

  return <BolgeDuzenForm region={region} />
}
