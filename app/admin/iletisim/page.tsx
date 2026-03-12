import fs from 'fs/promises'
import path from 'path'
import { ContactEditor } from '@/components/admin/contact-editor'

export const dynamic = 'force-dynamic'

export default async function IletisimPage() {
  const pagesPath = path.join(process.cwd(), 'content', 'pages.json')
  const pagesContent = await fs.readFile(pagesPath, 'utf-8')
  const pages = JSON.parse(pagesContent)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">İletişim Sayfası Düzenleme</h1>
      <ContactEditor contactData={pages.contact} />
    </div>
  )
}
