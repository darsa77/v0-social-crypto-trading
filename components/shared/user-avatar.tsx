import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User } from '@/lib/types'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showBadge?: boolean
  showOnline?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
}

const badgeSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function UserAvatar({ user, size = 'md', showBadge = true, showOnline = false, className }: UserAvatarProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={user.displayName} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {user.displayName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      {showBadge && user.verified && (
        <BadgeCheck className={cn('absolute -bottom-0.5 -right-0.5 fill-primary text-primary-foreground', badgeSizeClasses[size])} />
      )}
      {showOnline && user.isOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-crypto-positive" />
      )}
    </div>
  )
}
