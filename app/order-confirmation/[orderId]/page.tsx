'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Download, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
  payment_method: string
  order_items?: Array<{
    quantity: number
    unit_price: number
    service: { name: string }
  }>
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            total_amount,
            status,
            created_at,
            payment_method,
            order_items (
              quantity,
              unit_price,
              service:services(name)
            )
          `)
          .eq('id', orderId)
          .single()

        if (error) throw error
        setOrder(data)
      } catch (error) {
        toast.error('Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading confirmation...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-destructive">Order not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Your order has been successfully placed.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold">Items Ordered:</h3>
              {order.order_items?.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.service.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{(item.unit_price * item.quantity).toFixed(2)} TND</p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{order.total_amount.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{order.total_amount.toFixed(2)} TND</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
              <p className="text-sm font-medium mb-1">Payment Method</p>
              <p className="text-sm capitalize">{order.payment_method}</p>
            </div>

            {/* Status */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
              <p className="text-sm font-medium mb-1">Status</p>
              <p className="text-sm capitalize">{order.status}</p>
            </div>

            {/* Order Date */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
              <p className="text-sm font-medium mb-1">Order Date</p>
              <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>
          <Link href="/products">
            <Button className="w-full gap-2">
              <ShoppingCart className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Next Steps */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>We'll send you a confirmation email shortly</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Your order will be processed and prepared for delivery</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>You'll receive tracking information once your order ships</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
