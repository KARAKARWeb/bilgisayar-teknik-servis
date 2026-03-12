import { getSiteConfig } from '@/lib/config'
import { 
  generateLocalBusinessSchema, 
  generateOrganizationSchema, 
  generateWebSiteSchema 
} from '@/lib/schema'

export default async function SchemaPage() {
  const config = await getSiteConfig()
  
  const schemas = {
    localBusiness: generateLocalBusinessSchema(config),
    organization: generateOrganizationSchema(config),
    website: generateWebSiteSchema(config),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Schema Yönetimi</h1>
        <p className="text-gray-600">Tüm schema markup'larınızı görüntüleyin ve kontrol edin</p>
      </div>

      {Object.entries(schemas).map(([key, schema]) => (
        <div key={key} className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  )
}
