'use client'

import { useState } from 'react'
import { Search, ShoppingCart, SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { CategoryFilter } from '@/components/marketplace/category-filter'
import { ProductCard } from '@/components/marketplace/product-card'
import { CartDrawer } from '@/components/marketplace/cart-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/components/cart-provider'
import { products } from '@/lib/mock-data'
import type { MarketplaceCategory, MarketplaceSort } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function MarketplacePage() {
  const [category, setCategory] = useState<MarketplaceCategory>('all')
  const [sort, setSort] = useState<MarketplaceSort>('popular')
  const [search, setSearch] = useState('')
  const { itemCount, setIsOpen } = useCart()

  const filteredProducts = products
    .filter((product) => {
      if (category !== 'all' && product.category !== category) return false
      if (search && !product.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.sales - a.sales
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return b.sales - a.sales
      }
    })

  return (
    <div className="min-h-screen">
      <Header title="Marketplace" />
      <CartDrawer />

      <div className="mx-auto max-w-6xl px-4 py-4 md:py-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Marketplace</h1>
            <p className="mt-1 text-muted-foreground">
              Discover trading signals, strategies, and tools from top traders
            </p>
          </div>
          <Button className="relative gap-2 md:hidden" onClick={() => setIsOpen(true)}>
            <ShoppingCart className="h-4 w-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-crypto-positive text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Button>
        </div>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sort} onValueChange={(value) => setSort(value as MarketplaceSort)}>
            <SelectTrigger className="w-full sm:w-40">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
