import { Header } from '@/components/layout/header'
import { ConversationList } from '@/components/chat/conversation-list'
import { conversations } from '@/lib/mock-data'
import { MessageCircle } from 'lucide-react'

export default function ChatPage() {
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="min-h-screen">
      <Header title="Messages" />

      <div className="mx-auto max-w-2xl md:py-4">
        <div className="hidden items-center justify-between border-b border-border px-4 pb-4 md:flex">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalUnread > 0 ? `${totalUnread} unread messages` : 'All caught up!'}
            </p>
          </div>
        </div>

        {conversations.length > 0 ? (
          <ConversationList conversations={conversations} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No messages yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Start a conversation with other traders
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
