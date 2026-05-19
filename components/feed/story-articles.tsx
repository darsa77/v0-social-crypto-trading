'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { stories, formatDate } from '@/lib/mock-data'

export function StoryArticles() {
  return (
    <aside className="hidden w-80 shrink-0 space-y-3 md:block">
      <div className="sticky top-20 space-y-3">
        <h3 className="px-2 text-sm font-semibold">Stories & Articles</h3>
        {stories.map((story) => (
          <Card key={story.id} className="border-border/50 bg-card">
            <CardContent className="p-3">
              <Link href={`#`} className="group block">
                <div className="mb-2 h-36 w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="line-clamp-2 text-sm font-semibold">{story.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{story.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{story.author.displayName}</span>
                  <span>{formatDate(story.publishedAt)} · {story.readingTime}</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </aside>
  )
}
