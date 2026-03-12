import { ReviewCard } from '@/components/shared/review-card'
import { Star } from 'lucide-react'

interface ReviewsSectionProps {
  reviews: any[]
  title?: string
  description?: string
  pageContent?: any
}

export function ReviewsSection({ reviews, title, description, pageContent }: ReviewsSectionProps) {
  const featuredReviews = reviews.filter((r) => r.featured || r.approved).slice(0, 3)
  
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-lg font-semibold text-black">
              {averageRating} / 5.0
            </span>
          </div>
          
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {title || pageContent?.homepage?.reviews?.title || 'Müşteri Yorumları'}
          </h2>
          <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
            {pageContent?.homepage?.reviews?.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </section>
  )
}
