import fs from 'fs/promises'
import path from 'path'

export async function getPageContent() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'pages.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading page content:', error)
    return {
      homepage: {},
      about: {},
      privacy: {},
      cookies: {}
    }
  }
}
