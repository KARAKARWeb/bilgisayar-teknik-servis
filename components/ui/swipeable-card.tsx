'use client'

import { useSwipeable } from 'react-swipeable'
import { motion } from 'framer-motion'

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
}

export function SwipeableCard({ children, onSwipeLeft, onSwipeRight, className }: SwipeableCardProps) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft?.(),
    onSwipedRight: () => onSwipeRight?.(),
    trackMouse: true,
    preventScrollOnSwipe: true,
  })

  return (
    <motion.div
      {...handlers}
      className={className}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
