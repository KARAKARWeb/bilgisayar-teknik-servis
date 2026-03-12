import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const REVIEWS_FILE = path.join(process.cwd(), 'content/reviews.json')

export async function GET() {
  try {
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    const reviews = JSON.parse(data)
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newReview = await request.json()
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    const reviews = JSON.parse(data)
    
    reviews.push(newReview)
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
    
    return NextResponse.json({ success: true, review: newReview })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedReview = await request.json()
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    const reviews = JSON.parse(data)
    
    const index = reviews.findIndex((r: any) => r.id === updatedReview.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    
    reviews[index] = updatedReview
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
    
    return NextResponse.json({ success: true, review: updatedReview })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    const reviews = JSON.parse(data)
    
    const filtered = reviews.filter((r: any) => r.id !== id)
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(filtered, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
