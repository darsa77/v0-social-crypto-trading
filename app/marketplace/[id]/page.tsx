'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, ShoppingCart, TrendingUp, BadgeCheck, Users, Award } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { CartDrawer } from '@/components/marketplace/cart-drawer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/components/cart-provider'
import { products } from '@/lib/mock-data'
import { formatNumber } from '@/lib/mock-data'
import { notFound } from 'next/navigation'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header title="Product" />
      <CartDrawer />

      <div className="mx-auto max-w-4xl px-4 py-4 md:py-6">
        <Link
          href="/marketplace"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted md:aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({formatNumber(product.reviewsCount)} reviews)
                </span>
              </div>
            </div>

            <h1 className="mt-3 text-2xl font-bold md:text-3xl">{product.title}</h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="font-semibold text-primary">
                  {product.seller.displayName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{product.seller.displayName}</span>
                  {product.seller.verified && (
                    <BadgeCheck className="h-4 w-4 fill-primary text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(product.seller.followers)} followers
                </span>
              </div>
            </div>

            <p className="mt-4 text-muted-foreground">{product.longDescription}</p>

            {product.performance && (
              <Card className="mt-4 border-crypto-positive/30 bg-crypto-positive/5">
                <CardContent className="p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-4 w-4 text-crypto-positive" />
                    Performance Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-crypto-positive">
                        {product.performance.winRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-crypto-positive">
                        +{product.performance.avgReturn}%
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Return</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{product.performance.totalTrades}</p>
                      <p className="text-xs text-muted-foreground">Total Trades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {formatNumber(product.sales)} sales
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Top seller
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-3xl font-bold">${product.price}</p>
                </div>
                <Button size="lg" className="gap-2" onClick={() => addItem(product)}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
