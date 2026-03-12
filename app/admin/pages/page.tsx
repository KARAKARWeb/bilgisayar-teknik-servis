import { getSiteConfig } from '@/lib/config'
import { PageSettingsForm } from './form'

export const dynamic = 'force-dynamic'

export default async function AdminPagesPage() {
  const config = await getSiteConfig()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Sayfa Ayarları</h1>
      <PageSettingsForm config={config} />
    </div>
  )
}
