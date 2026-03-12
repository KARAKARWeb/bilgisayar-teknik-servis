import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variants
          {
            'bg-black text-white hover:bg-gray-800': variant === 'primary',
            'bg-white text-black border border-gray-200 hover:bg-gray-50 hover:border-gray-300': variant === 'secondary',
            'border border-gray-200 hover:bg-gray-50': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
          },
          
          // Sizes - Next.js.org exact
          {
            'h-8 px-4 text-[13px] rounded-sm': size === 'sm',        // 32px height, 16px padding, 6px radius
            'h-10 px-5 text-sm rounded-md': size === 'md',           // 40px height, 20px padding, 8px radius
            'h-12 px-6 text-base rounded-md': size === 'lg',         // 48px height, 24px padding, 8px radius
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
