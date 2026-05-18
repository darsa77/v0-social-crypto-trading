'use client'

import { cn } from '@/lib/utils'
import type { FeedFilter } from '@/lib/types'

interface FeedFiltersProps {
  activeFilter: FeedFilter
  onFilterChange: (filter: FeedFilter) => void
}

const filters: { value: FeedFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'following', label: 'Following' },
  { value: 'trending', label: 'Trending' },
  { value: 'signals', label: 'Signals' },
]

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide md:px-0">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeFilter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
