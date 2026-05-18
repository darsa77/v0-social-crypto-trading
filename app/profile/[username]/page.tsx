'use client'

import { use } from 'react'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileTabs } from '@/components/profile/profile-tabs'
import { PostCard } from '@/components/feed/post-card'
import { users, posts, products } from '@/lib/mock-data'
import { ProductCard } from '@/components/marketplace/product-card'
import { FileText, Store } from 'lucide-react'

const tabs = [
  { value: 'posts', label: 'Posts' },
  { value: 'products', label: 'Products' },
]

export default function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const [activeTab, setActiveTab] = useState('posts')

  const user = users.find((u) => u.username === username)

  if (!user) {
    notFound()
  }

  const userPosts = posts.filter((post) => post.author.id === user.id)
  const userProducts = products.filter((product) => product.seller.id === user.id)

  return (
    <div className="min-h-screen">
      <Header title={user.displayName} />

      <div className="mx-auto max-w-2xl">
        <ProfileHeader user={user} />

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
                  description="This user hasn&apos;t posted anything yet."
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
                    title="No products"
                    description="This user isn&apos;t selling anything yet."
                  />
                </div>
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
