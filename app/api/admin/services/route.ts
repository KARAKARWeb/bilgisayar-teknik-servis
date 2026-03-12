import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const SERVICES_FILE = path.join(process.cwd(), 'content/services.json')

export async function GET() {
  try {
    const data = await fs.readFile(SERVICES_FILE, 'utf-8')
    const services = JSON.parse(data)
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newService = await request.json()
    const data = await fs.readFile(SERVICES_FILE, 'utf-8')
    const services = JSON.parse(data)
    
    services.push(newService)
    await fs.writeFile(SERVICES_FILE, JSON.stringify(services, null, 2))
    
    return NextResponse.json({ success: true, service: newService })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedService = await request.json()
    const data = await fs.readFile(SERVICES_FILE, 'utf-8')
    const services = JSON.parse(data)
    
    const index = services.findIndex((s: any) => s.id === updatedService.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }
    
    services[index] = updatedService
    await fs.writeFile(SERVICES_FILE, JSON.stringify(services, null, 2))
    
    return NextResponse.json({ success: true, service: updatedService })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fs.readFile(SERVICES_FILE, 'utf-8')
    const services = JSON.parse(data)
    
    const filtered = services.filter((s: any) => s.id !== id)
    await fs.writeFile(SERVICES_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
