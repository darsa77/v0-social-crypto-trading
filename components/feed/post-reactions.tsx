'use client'

import { useState } from 'react'
import { Rocket, TrendingUp, TrendingDown, Gem, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Post, ReactionType } from '@/lib/types'
import { formatNumber } from '@/lib/mock-data'

interface PostReactionsProps {
  post: Post
  onReact: (type: ReactionType) => void
}

const reactions: { type: ReactionType; icon: typeof Rocket; label: string; activeColor: string }[] = [
  { type: 'rocket', icon: Rocket, label: 'Rocket', activeColor: 'text-primary' },
  { type: 'bullish', icon: TrendingUp, label: 'Bullish', activeColor: 'text-crypto-positive' },
  { type: 'bearish', icon: TrendingDown, label: 'Bearish', activeColor: 'text-crypto-negative' },
  { type: 'diamond', icon: Gem, label: 'Diamond', activeColor: 'text-cyan-400' },
  { type: 'fire', icon: Flame, label: 'Fire', activeColor: 'text-orange-500' },
]

export function PostReactions({ post, onReact }: PostReactionsProps) {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(post.userReaction || null)

  const handleReact = (type: ReactionType) => {
    if (userReaction === type) {
      setUserReaction(null)
    } else {
      setUserReaction(type)
    }
    onReact(type)
  }

  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0)

  return (
    <div className="flex items-center gap-1">
      {reactions.map((reaction) => {
        const Icon = reaction.icon
        const isActive = userReaction === reaction.type
        const count = post.reactions[reaction.type] + (isActive && !post.userReaction ? 1 : 0)

        return (
          <button
            key={reaction.type}
            onClick={() => handleReact(reaction.type)}
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-all',
              isActive
                ? `${reaction.activeColor} bg-accent`
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
            title={reaction.label}
          >
            <Icon className="h-4 w-4" />
            {count > 0 && <span>{formatNumber(count)}</span>}
          </button>
        )
      })}
    </div>
  )
}
