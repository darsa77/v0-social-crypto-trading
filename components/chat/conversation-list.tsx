'use client'

import Link from 'next/link'
import { UserAvatar } from '@/components/shared/user-avatar'
import { formatTimeAgo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { Conversation } from '@/lib/types'

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  return (
    <div className="divide-y divide-border">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/chat/${conversation.id}`}
          className={cn(
            'flex items-center gap-3 p-4 transition-colors hover:bg-accent',
            activeId === conversation.id && 'bg-accent'
          )}
        >
          <UserAvatar user={conversation.participant} showOnline showBadge={false} />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-medium">{conversation.participant.displayName}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatTimeAgo(conversation.lastMessage.timestamp)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p
                className={cn(
                  'truncate text-sm',
                  conversation.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {conversation.lastMessage.senderId === 'current-user' && 'You: '}
                {conversation.lastMessage.content}
              </p>
              {conversation.unreadCount > 0 && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
