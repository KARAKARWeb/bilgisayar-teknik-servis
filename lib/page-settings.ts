import fs from 'fs/promises'
import path from 'path'

export async function getPageSettings() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'page-settings.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading page settings:', error)
    return {}
  }
}
