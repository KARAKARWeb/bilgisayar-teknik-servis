import fs from 'fs/promises'
import path from 'path'
import { getRegions } from '@/lib/content'
import { RegionsListClient } from './list-client'

export const dynamic = 'force-dynamic'

export default async function AdminRegionsPage() {
  const regions = await getRegions()
  
  // Page settings oku
  const pageSettingsPath = path.join(process.cwd(), 'content', 'page-settings.json')
  const pageSettingsContent = await fs.readFile(pageSettingsPath, 'utf-8')
  const pageSettings = JSON.parse(pageSettingsContent)

  return <RegionsListClient regions={regions} pageSettings={pageSettings['hizmet-bolgeleri'] || {}} />
}
