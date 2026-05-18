'use client'

import { useState } from 'react'
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { total, clearCart, setIsOpen } = useCart()
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('processing')
    setTimeout(() => {
      setStep('success')
    }, 2000)
  }

  const handleClose = () => {
    if (step === 'success') {
      clearCart()
      setIsOpen(false)
    }
    onOpenChange(false)
    setTimeout(() => setStep('form'), 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Checkout
              </DialogTitle>
              <DialogDescription>
                Complete your purchase (simulated checkout)
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="4242 4242 4242 4242" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <div className="rounded-lg bg-accent/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Pay ${total.toFixed(2)}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                This is a simulated checkout. No real payment will be processed.
              </p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Processing payment...</p>
            <p className="mt-1 text-sm text-muted-foreground">Please wait</p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-positive/20">
              <CheckCircle className="h-8 w-8 text-crypto-positive" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Payment Successful!</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. You can now access your products in your profile.
            </p>
            <Button className="mt-6" onClick={handleClose}>
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
