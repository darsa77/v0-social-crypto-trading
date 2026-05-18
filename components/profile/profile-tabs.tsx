'use client'

import { cn } from '@/lib/utils'

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { value: string; label: string }[]
}

export function ProfileTabs({ activeTab, onTabChange, tabs }: ProfileTabsProps) {
  return (
    <div className="border-b border-border">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              'relative flex-1 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            {activeTab === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
