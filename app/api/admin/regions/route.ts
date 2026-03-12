import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const REGIONS_FILE = path.join(process.cwd(), 'content/regions.json')

export async function GET() {
  try {
    const data = await fs.readFile(REGIONS_FILE, 'utf-8')
    const regions = JSON.parse(data)
    return NextResponse.json(regions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read regions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newRegion = await request.json()
    const data = await fs.readFile(REGIONS_FILE, 'utf-8')
    const regions = JSON.parse(data)
    
    regions.push(newRegion)
    await fs.writeFile(REGIONS_FILE, JSON.stringify(regions, null, 2))
    
    return NextResponse.json({ success: true, region: newRegion })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedRegion = await request.json()
    const data = await fs.readFile(REGIONS_FILE, 'utf-8')
    const regions = JSON.parse(data)
    
    const index = regions.findIndex((r: any) => r.id === updatedRegion.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 })
    }
    
    regions[index] = updatedRegion
    await fs.writeFile(REGIONS_FILE, JSON.stringify(regions, null, 2))
    
    return NextResponse.json({ success: true, region: updatedRegion })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update region' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fs.readFile(REGIONS_FILE, 'utf-8')
    const regions = JSON.parse(data)
    
    const filtered = regions.filter((r: any) => r.id !== id)
    await fs.writeFile(REGIONS_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete region' }, { status: 500 })
  }
}
