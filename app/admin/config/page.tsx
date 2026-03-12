import fs from 'fs/promises'
import path from 'path'
import { getSiteConfig } from '@/lib/config'
import { ConfigForm } from './config-form'

export default async function AdminConfigPage() {
  const config = await getSiteConfig()
  
  const pagesPath = path.join(process.cwd(), 'content', 'pages.json')
  const pagesContent = await fs.readFile(pagesPath, 'utf-8')
  const pages = JSON.parse(pagesContent)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Site Ayarları</h1>
        <p className="text-gray-900 mt-2">Site yapılandırmasını düzenleyin</p>
      </div>

      <ConfigForm config={config} footerData={pages.footer} />
    </div>
  )
}
