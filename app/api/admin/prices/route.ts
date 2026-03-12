import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const PRICES_FILE = path.join(process.cwd(), 'content/prices.json')

export async function GET() {
  try {
    const data = await fs.readFile(PRICES_FILE, 'utf-8')
    const prices = JSON.parse(data)
    return NextResponse.json(prices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read prices' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPrice = await request.json()
    const data = await fs.readFile(PRICES_FILE, 'utf-8')
    const prices = JSON.parse(data)
    
    prices.push(newPrice)
    await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2))
    
    return NextResponse.json({ success: true, price: newPrice })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create price' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedPrice = await request.json()
    const data = await fs.readFile(PRICES_FILE, 'utf-8')
    const prices = JSON.parse(data)
    
    const index = prices.findIndex((p: any) => p.id === updatedPrice.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 })
    }
    
    prices[index] = updatedPrice
    await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2))
    
    return NextResponse.json({ success: true, price: updatedPrice })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update price' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fs.readFile(PRICES_FILE, 'utf-8')
    const prices = JSON.parse(data)
    
    const filtered = prices.filter((p: any) => p.id !== id)
    await fs.writeFile(PRICES_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete price' }, { status: 500 })
  }
}
