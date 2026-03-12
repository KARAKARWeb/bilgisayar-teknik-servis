import { HizmetDuzenForm } from './form'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

export default async function HizmetDuzenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const filePath = path.join(process.cwd(), 'content', 'services.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const services = JSON.parse(fileContent)
  const service = services.find((s: any) => s.id === id || s.slug === id)

  if (!service) {
    return <div className="p-8">Hizmet bulunamadı</div>
  }

  return <HizmetDuzenForm service={service} />
}

