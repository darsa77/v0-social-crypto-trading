'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { FeedFilters } from '@/components/feed/feed-filters'
import { PostCard } from '@/components/feed/post-card'
import { StoryArticles } from '@/components/feed/story-articles'
import { posts } from '@/lib/mock-data'
import type { FeedFilter } from '@/lib/types'

export default function FeedPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState<FeedFilter>('all')

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
    if (isLoaded && isSignedIn) {
      fetch('/api/profile', { method: 'POST' })
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) return null

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true
    if (filter === 'signals') return post.type === 'signal'
    if (filter === 'trending') return post.reactions.rocket > 200
    return true
  })

  return (
    <div className="min-h-screen">
      <Header title="Feed" />
      
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div className="mb-6 flex items-center gap-3 rounded-3xl border border-border bg-card/80 px-4 py-4 shadow-sm backdrop-blur-xl md:px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="h-8 w-8 object-contain" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Site</p>
            <h1 className="text-xl font-semibold">CryptoSocial</h1>
          </div>
        </div>

        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl md:pt-4">
          <FeedFilters activeFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
          <main className="space-y-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </main>

          <StoryArticles />
        </div>
      </div>
    </div>
  )
}