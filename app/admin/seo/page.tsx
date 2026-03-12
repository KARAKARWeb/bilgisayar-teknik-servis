import { SEOAnalysis } from './analysis'
import fs from 'fs/promises'
import path from 'path'

export default async function SEOPage() {
  const filePath = path.join(process.cwd(), 'config', 'site.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const config = JSON.parse(fileContent)

  return <SEOAnalysis initialConfig={config} />
}
