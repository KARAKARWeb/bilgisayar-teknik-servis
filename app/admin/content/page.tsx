import fs from 'fs/promises'
import path from 'path'
import { HomepageEditor } from './homepage-editor'

export const dynamic = 'force-dynamic'

export default async function AdminContentPage() {
  const pagesPath = path.join(process.cwd(), 'content', 'pages.json')
  const pagesContent = await fs.readFile(pagesPath, 'utf-8')
  const pages = JSON.parse(pagesContent)
  
  const settingsPath = path.join(process.cwd(), 'content', 'page-settings.json')
  const settingsContent = await fs.readFile(settingsPath, 'utf-8')
  const pageSettings = JSON.parse(settingsContent)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Ana Sayfa</h1>
      <HomepageEditor 
        homepageData={pages.homepage}
        pageSettings={pageSettings}
      />
    </div>
  )
}
