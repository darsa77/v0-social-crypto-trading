'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, MessageCircle, User, Plus, TrendingUp, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/cart-provider'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { currentUser } from '@/lib/mock-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/marketplace', icon: Store, label: 'Marketplace' },
  { href: '/chat', icon: MessageCircle, label: 'Messages' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold">CryptoSocial</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-600/10 text-violet-500'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.href === '/marketplace' && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </div>
              {item.label}
              {isActive && (
                <span className="absolute left-0 h-8 w-1 rounded-r-full bg-violet-500" />
              )}
            </Link>
          )
        })}

        <Link
          href="/create"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <Plus className="h-5 w-5" />
          Create Post
        </Link>
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-accent/50 p-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
            <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{currentUser.displayName}</p>
            <p className="truncate text-xs text-muted-foreground">@{currentUser.username}</p>
          </div>
          <button className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
