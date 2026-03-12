import { getReviews } from '@/lib/content'
import { ReviewsListClient } from './list-client'

export default async function AdminReviewsPage() {
  const reviews = await getReviews()

  return <ReviewsListClient reviews={reviews} />
}
