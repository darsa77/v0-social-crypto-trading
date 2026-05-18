'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { FeedFilters } from '@/components/feed/feed-filters'
import { PostCard } from '@/components/feed/post-card'
import { posts } from '@/lib/mock-data'
import type { FeedFilter } from '@/lib/types'

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedFilter>('all')

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true
    if (filter === 'signals') return post.type === 'signal'
    if (filter === 'trending') return post.reactions.rocket > 200
    return true
  })

  return (
    <div className="min-h-screen">
      <Header title="Feed" />
      
      <div className="mx-auto max-w-2xl">
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl md:top-0 md:pt-4">
          <FeedFilters activeFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="space-y-3 px-4 pb-4 md:px-0">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
