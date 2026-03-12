import { cn } from '@/lib/utils'

interface CharacterCounterProps {
  current: number
  max: number
  className?: string
}

export function CharacterCounter({ current, max, className }: CharacterCounterProps) {
  const remaining = max - current
  const isOverLimit = current > max
  const isNearLimit = remaining <= 10 && remaining > 0

  return (
    <div
      className={cn(
        'text-sm',
        isOverLimit && 'text-red-600',
        isNearLimit && 'text-orange-600',
        !isOverLimit && !isNearLimit && 'text-gray-500',
        className
      )}
    >
      {current}/{max} karakter
      {isOverLimit && ` (${Math.abs(remaining)} fazla)`}
    </div>
  )
}
