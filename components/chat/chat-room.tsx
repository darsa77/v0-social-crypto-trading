'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react'
import { UserAvatar } from '@/components/shared/user-avatar'
import { MessageBubble } from '@/components/chat/message-bubble'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Conversation, Message } from '@/lib/types'

interface ChatRoomProps {
  conversation: Conversation
  initialMessages: Message[]
}

export function ChatRoom({ conversation, initialMessages }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')

    // Simulate reply after a delay
    setTimeout(() => {
      const reply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: conversation.participant.id,
        content: getRandomReply(),
        timestamp: new Date().toISOString(),
        read: false,
      }
      setMessages((prev) => [...prev, reply])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col md:h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card p-4">
        <Link href="/chat" className="md:hidden">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <UserAvatar user={conversation.participant} showOnline showBadge={false} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold">{conversation.participant.displayName}</h2>
          <p className="text-xs text-muted-foreground">
            {conversation.participant.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === 'current-user'
          const prevMessage = messages[index - 1]
          const showTimestamp =
            !prevMessage ||
            new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() >
              300000 ||
            message.senderId !== prevMessage.senderId

          return (
            <MessageBubble key={message.id} message={message} isOwn={isOwn} showTimestamp={showTimestamp} />
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const replies = [
  "That's interesting! Tell me more.",
  'I totally agree with you on that.',
  "Have you checked the charts today? $BTC is looking bullish!",
  'Thanks for sharing your thoughts!',
  'What do you think about the current market conditions?',
  "I've been DCA'ing for months now. Patience is key.",
  'Great insight! This is why I follow you.',
  "Let's catch up on a call sometime to discuss strategies.",
]

function getRandomReply() {
  return replies[Math.floor(Math.random() * replies.length)]
}
