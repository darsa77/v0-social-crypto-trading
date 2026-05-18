'use client'

import { cn } from '@/lib/utils'
import type { MarketplaceCategory } from '@/lib/types'

interface CategoryFilterProps {
  activeCategory: MarketplaceCategory
  onCategoryChange: (category: MarketplaceCategory) => void
}

const categories: { value: MarketplaceCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'signals', label: 'Signals' },
  { value: 'strategies', label: 'Strategies' },
  { value: 'courses', label: 'Courses' },
  { value: 'tools', label: 'Tools' },
]

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === category.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
