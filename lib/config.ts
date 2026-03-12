import fs from 'fs/promises'
import path from 'path'
import type { SiteConfig } from '@/types'

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const configPath = path.join(process.cwd(), 'config/site.json')
    const data = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(data)
    
    // Validate config has required fields
    if (!config.site || !config.contact || !config.seo) {
      throw new Error('Invalid config structure')
    }
    
    return config
  } catch (error) {
    console.error('Error loading site config:', error)
    throw error
  }
}

export async function updateSiteConfig(config: SiteConfig): Promise<void> {
  const configPath = path.join(process.cwd(), 'config/site.json')
  await fs.writeFile(configPath, JSON.stringify(config, null, 2))
}
