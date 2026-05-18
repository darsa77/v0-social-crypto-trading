'use client'

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'
import { CheckoutModal } from '@/components/marketplace/checkout-modal'

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount, isOpen, setIsOpen, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cart ({itemCount})
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Your cart is empty</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse the marketplace to find trading signals and strategies
                </p>
              </div>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto py-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 rounded-lg border border-border p-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-1 text-sm font-medium">{item.product.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                        {item.product.category}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-accent"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-accent"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="self-start text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={() => setShowCheckout(true)}>
                  Checkout
                </Button>
                <Button
                  variant="ghost"
                  className="mt-2 w-full text-muted-foreground"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal open={showCheckout} onOpenChange={setShowCheckout} />
    </>
  )
}
