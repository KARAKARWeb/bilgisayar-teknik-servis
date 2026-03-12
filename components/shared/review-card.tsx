import Image from 'next/image'
import { Star } from 'lucide-react'

interface ReviewCardProps {
  review: {
    id: string
    name: string
    company?: string
    position?: string
    comment: string
    rating: number
    date?: string
    avatar?: string
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className="mb-4 text-gray-700 leading-relaxed">{review.comment}</p>

      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.name}
            width={40}
            height={40}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            sizes="40px"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-900">
            {review.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-black">{review.name}</p>
          {(review.position || review.company) && (
            <p className="text-sm text-gray-900">
              {review.position}
              {review.position && review.company && ' - '}
              {review.company}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
