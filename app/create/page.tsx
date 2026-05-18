'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Image as ImageIcon, TrendingUp, BarChart2, X } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type PostType = 'text' | 'signal'

export default function CreatePostPage() {
  const router = useRouter()
  const [postType, setPostType] = useState<PostType>('text')
  const [content, setContent] = useState('')
  const [signal, setSignal] = useState({
    ticker: '',
    action: 'buy' as 'buy' | 'sell',
    entry: '',
    target: '',
    stopLoss: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    router.push('/feed')
  }

  const isValid = content.trim().length > 0 && (postType !== 'signal' || signal.ticker.trim().length > 0)

  return (
    <div className="min-h-screen">
      <Header title="Create Post" />

      <div className="mx-auto max-w-2xl px-4 py-4 md:py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/feed">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                <AvatarFallback>{currentUser.displayName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex gap-2">
                  <button
                    onClick={() => setPostType('text')}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      postType === 'text'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                  >
                    <BarChart2 className="h-4 w-4" />
                    Text
                  </button>
                  <button
                    onClick={() => setPostType('signal')}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      postType === 'signal'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Signal
                  </button>
                </div>

                <Textarea
                  placeholder="What's happening in crypto? Use $TICKER to highlight tokens..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] resize-none border-0 p-0 text-base focus-visible:ring-0"
                />

                {postType === 'signal' && (
                  <div className="mt-4 rounded-lg border border-border bg-accent/30 p-4">
                    <h4 className="mb-3 font-semibold">Signal Details</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="ticker">Ticker</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="ticker"
                            placeholder="BTC"
                            value={signal.ticker}
                            onChange={(e) =>
                              setSignal({ ...signal, ticker: e.target.value.toUpperCase() })
                            }
                            className="pl-7 uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Action</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={signal.action === 'buy' ? 'default' : 'outline'}
                            size="sm"
                            className={cn(
                              'flex-1',
                              signal.action === 'buy' && 'bg-crypto-positive hover:bg-crypto-positive/90'
                            )}
                            onClick={() => setSignal({ ...signal, action: 'buy' })}
                          >
                            Buy
                          </Button>
                          <Button
                            type="button"
                            variant={signal.action === 'sell' ? 'default' : 'outline'}
                            size="sm"
                            className={cn(
                              'flex-1',
                              signal.action === 'sell' && 'bg-crypto-negative hover:bg-crypto-negative/90'
                            )}
                            onClick={() => setSignal({ ...signal, action: 'sell' })}
                          >
                            Sell
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entry">Entry Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="entry"
                            type="number"
                            placeholder="0.00"
                            value={signal.entry}
                            onChange={(e) => setSignal({ ...signal, entry: e.target.value })}
                            className="pl-7"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="target">Target Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="target"
                            type="number"
                            placeholder="0.00"
                            value={signal.target}
                            onChange={(e) => setSignal({ ...signal, target: e.target.value })}
                            className="pl-7"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="stopLoss">Stop Loss</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="stopLoss"
                            type="number"
                            placeholder="0.00"
                            value={signal.stopLoss}
                            onChange={(e) => setSignal({ ...signal, stopLoss: e.target.value })}
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">{content.length}/500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By posting, you agree to our community guidelines. Always do your own research.
        </p>
      </div>
    </div>
  )
}
