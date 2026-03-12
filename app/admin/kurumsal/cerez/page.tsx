import fs from 'fs/promises'
import path from 'path'
import { SimplePageEditor } from '@/components/admin/simple-page-editor'

export const dynamic = 'force-dynamic'

export default async function CerezPage() {
  const pagesPath = path.join(process.cwd(), 'content', 'pages.json')
  const pagesContent = await fs.readFile(pagesPath, 'utf-8')
  const pages = JSON.parse(pagesContent)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Çerez Politikası</h1>
      <SimplePageEditor pageKey="cookies" pageData={pages.cookies} />
    </div>
  )
}
