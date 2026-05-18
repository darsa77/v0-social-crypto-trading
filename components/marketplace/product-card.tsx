'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, TrendingUp, BadgeCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'
import { formatNumber } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="group overflow-hidden border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/marketplace/${product.id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <span
              className={cn(
                'rounded-full px-2 py-1 text-xs font-medium',
                product.category === 'signals' && 'bg-primary/90 text-primary-foreground',
                product.category === 'strategies' && 'bg-crypto-positive/90 text-white',
                product.category === 'courses' && 'bg-blue-500/90 text-white',
                product.category === 'tools' && 'bg-orange-500/90 text-white'
              )}
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/marketplace/${product.id}`}>
          <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xs font-medium text-primary">
              {product.seller.displayName.charAt(0)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {product.seller.displayName}
            {product.seller.verified && <BadgeCheck className="h-3 w-3 fill-primary text-primary-foreground" />}
          </span>
        </div>

        {product.performance && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-accent/50 p-2">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-crypto-positive" />
              <span className="text-xs font-medium">{product.performance.winRate}% Win</span>
            </div>
            <div className="text-xs text-muted-foreground">
              +{product.performance.avgReturn}% Avg
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({formatNumber(product.reviewsCount)})</span>
          </div>
          <span className="text-lg font-bold">${product.price}</span>
        </div>

        <Button
          className="mt-3 w-full gap-2"
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
