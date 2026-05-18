'use client'

import { cn } from '@/lib/utils'
import type { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showTimestamp?: boolean
}

export function MessageBubble({ message, isOwn, showTimestamp = true }: MessageBubbleProps) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[75%]', isOwn ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2',
            isOwn
              ? 'rounded-br-md bg-primary text-primary-foreground'
              : 'rounded-bl-md bg-secondary text-secondary-foreground'
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        {showTimestamp && (
          <p className={cn('mt-1 text-xs text-muted-foreground', isOwn && 'text-right')}>
            {time}
            {isOwn && message.read && <span className="ml-1">Read</span>}
          </p>
        )}
      </div>
    </div>
  )
}
