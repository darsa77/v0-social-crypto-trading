'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Settings, Share, MessageCircle, BadgeCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/mock-data'
import type { User } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProfileHeaderProps {
  user: User
  isCurrentUser?: boolean
}

export function ProfileHeader({ user, isCurrentUser = false }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="border-b border-border bg-card pb-6">
      {/* Cover gradient */}
      <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 md:h-32" />

      <div className="px-4">
        {/* Avatar and actions */}
        <div className="-mt-12 flex items-end justify-between md:-mt-16">
          <Avatar className="h-24 w-24 border-4 border-background md:h-32 md:w-32">
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback className="text-2xl">{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex gap-2">
            {isCurrentUser ? (
              <>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Link href="/profile/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/chat`}>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={cn(isFollowing && 'border-primary text-primary')}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* User info */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold md:text-2xl">{user.displayName}</h1>
            {user.verified && (
              <BadgeCheck className="h-5 w-5 fill-primary text-primary-foreground md:h-6 md:w-6" />
            )}
          </div>
          <p className="text-muted-foreground">@{user.username}</p>
          <p className="mt-2 text-sm">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="mt-4 flex gap-6">
          <div className="text-center">
            <p className="font-bold">{formatNumber(user.postsCount)}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{formatNumber(user.followers)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{formatNumber(user.following)}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </div>
    </div>
  )
}
