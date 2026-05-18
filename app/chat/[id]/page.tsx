'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { ChatRoom } from '@/components/chat/chat-room'
import { conversations, messages } from '@/lib/mock-data'

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const conversation = conversations.find((c) => c.id === id)

  if (!conversation) {
    notFound()
  }

  const conversationMessages = messages[id] || []

  return <ChatRoom conversation={conversation} initialMessages={conversationMessages} />
}
