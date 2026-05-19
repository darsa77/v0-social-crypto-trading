'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Share2, Bookmark, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/shared/user-avatar'
import { PostReactions } from '@/components/feed/post-reactions'
import { cn } from '@/lib/utils'
import type { Post, ReactionType } from '@/lib/types'
import { formatDate, formatNumber } from '@/lib/mock-data'

interface PostCardProps {
  post: Post
}

function highlightTickers(text: string) {
  const parts = text.split(/(\$[A-Z]{2,10})/g)
  return parts.map((part, index) => {
    if (part.match(/^\$[A-Z]{2,10}$/)) {
      return (
        <span key={index} className="font-semibold text-crypto-positive">
          {part}
        </span>
      )
    }
    return part
  })
}

export function PostCard({ post }: PostCardProps) {
  const [saved, setSaved] = useState(post.saved)

  const handleReact = (type: ReactionType) => {
    // Mock reaction handling
  }

  return (
    <Card className="border-border/50 bg-card transition-colors hover:bg-accent/30">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <UserAvatar user={post.author} />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  href={`/profile/${post.author.username}`}
                  className="flex items-center gap-1 hover:underline"
                >
                  <span className="truncate font-semibold">{post.author.displayName}</span>
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>@{post.author.username}</span>
                  <span>·</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
              {highlightTickers(post.content)}
            </div>

            {post.signal && (
              <div className="mt-3 rounded-lg border border-border bg-accent/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                      post.signal.action === 'buy'
                        ? 'bg-crypto-positive/20 text-crypto-positive'
                        : post.signal.action === 'sell'
                        ? 'bg-crypto-negative/20 text-crypto-negative'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {post.signal.action === 'buy' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {post.signal.action.toUpperCase()}
                  </span>
                  <span className="font-bold text-crypto-positive">${post.signal.ticker}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Entry</span>
                    <p className="font-mono font-semibold">${post.signal.entry}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target</span>
                    <p className="font-mono font-semibold text-crypto-positive">${post.signal.target}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stop Loss</span>
                    <p className="font-mono font-semibold text-crypto-negative">${post.signal.stopLoss}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <PostReactions post={post} onReact={handleReact} />

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{formatNumber(post.commentsCount)}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{formatNumber(post.shares)}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('h-8 w-8', saved && 'text-primary')}
                  onClick={() => setSaved(!saved)}
                >
                  <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
