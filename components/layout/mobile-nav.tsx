'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, MessageCircle, User, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/cart-provider'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/marketplace', icon: Store, label: 'Shop' },
  { href: '/create', icon: Plus, label: 'Post', isCreate: true },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function MobileNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          if (item.isCreate) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-105 active:scale-95"
              >
                <Icon className="h-6 w-6" />
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors',
                isActive ? 'text-violet-500' : 'text-muted-foreground hover:text-foreground'
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
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-violet-500" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
