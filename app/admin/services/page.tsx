import fs from 'fs/promises'
import path from 'path'
import { getServices } from '@/lib/content'
import { ServicesListClient } from './list-client'
import { ServicesPageSettings } from './page-settings-form'

export const dynamic = 'force-dynamic'

export default async function AdminServicesPage() {
  const services = await getServices()
  
  const pageSettingsPath = path.join(process.cwd(), 'content', 'page-settings.json')
  const pageSettingsContent = await fs.readFile(pageSettingsPath, 'utf-8')
  const pageSettings = JSON.parse(pageSettingsContent)

  return (
    <div className="space-y-6">
      <ServicesPageSettings pageSettings={pageSettings['hizmetlerimiz'] || {}} />
      <ServicesListClient services={services} />
    </div>
  )
}
