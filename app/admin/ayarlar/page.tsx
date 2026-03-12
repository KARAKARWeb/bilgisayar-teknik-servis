import { AyarlarForm } from './form'
import fs from 'fs/promises'
import path from 'path'

export default async function AyarlarPage() {
  const filePath = path.join(process.cwd(), 'config', 'site.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const config = JSON.parse(fileContent)

  return <AyarlarForm config={config} />
}
