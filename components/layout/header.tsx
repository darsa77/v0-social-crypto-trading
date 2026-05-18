'use client'

import { TrendingUp, Bell, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title?: string
  showSearch?: boolean
}

export function Header({ title = 'CryptoSocial', showSearch = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-600" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="h-9 pl-9" />
          </div>
        </div>
      )}
    </header>
  )
}
