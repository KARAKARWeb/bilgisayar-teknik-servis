'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  href: string
  features?: string[]
  icon?: React.ReactNode
  className?: string
}

export function FeatureCard({ title, description, href, features, icon, className }: FeatureCardProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group relative block",
        "rounded-lg border border-gray-200 bg-white",
        "p-6 transition-all duration-200",
        "hover:border-gray-300 hover:shadow-lg",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-semibold text-black">
              {title}
            </h3>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="mt-auto space-y-2">
            {features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-900">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
