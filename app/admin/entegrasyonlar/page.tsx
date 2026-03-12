import { getSiteConfig } from '@/lib/config'
import { EntegrasyonlarForm } from './form'

export default async function EntegrasyonlarPage() {
  const config = await getSiteConfig()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Entegrasyonlar</h1>
        <p className="text-gray-600">Google Analytics, Facebook Pixel ve diğer entegrasyonları yönetin</p>
      </div>

      <EntegrasyonlarForm config={config} />
    </div>
  )
}
