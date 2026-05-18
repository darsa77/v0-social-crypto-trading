'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileTabs } from '@/components/profile/profile-tabs'
import { PostCard } from '@/components/feed/post-card'
import { ProductCard } from '@/components/marketplace/product-card'
import { currentUser, posts, products } from '@/lib/mock-data'
import { Bookmark, FileText, Store } from 'lucide-react'

const tabs = [
  { value: 'posts', label: 'Posts' },
  { value: 'products', label: 'Products' },
  { value: 'saved', label: 'Saved' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')

  const userPosts = posts.filter((post) => post.author.id === 'user-1').slice(0, 3)
  const savedPosts = posts.filter((post) => post.saved)
  const userProducts = products.slice(0, 2)

  return (
    <div className="min-h-screen">
      <Header title="Profile" />

      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={currentUser} isCurrentUser />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

        <div className="px-4 py-4 md:px-0">
          {activeTab === 'posts' && (
            <div className="space-y-3">
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <EmptyState
                  icon={FileText}
                  title="No posts yet"
                  description="When you create posts, they will appear here."
                />
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {userProducts.length > 0 ? (
                userProducts.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <div className="col-span-2">
                  <EmptyState
                    icon={Store}
                    title="No products yet"
                    description="Start selling your trading signals and strategies."
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-3">
              {savedPosts.length > 0 ? (
                savedPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <EmptyState
                  icon={Bookmark}
                  title="No saved posts"
                  description="Save posts to read them later."
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
