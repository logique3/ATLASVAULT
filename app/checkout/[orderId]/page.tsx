'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { CreditCard, Smartphone, DollarSign } from 'lucide-react'

interface Order {
  id: string
  total_amount: number
  status: string
  order_items?: Array<{
    quantity: number
    unit_price: number
    service: { name: string }
  }>
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'd17' | 'flouci'>('card')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            total_amount,
            status,
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
        router.push('/products')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  const handlePayment = async () => {
    setProcessing(true)
    try {
      // Update order with payment method
      const { error } = await supabase
        .from('orders')
        .update({ 
          payment_method: paymentMethod,
          status: 'processing'
        })
        .eq('id', orderId)

      if (error) throw error

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          order_id: orderId,
          amount: order?.total_amount,
          method: paymentMethod,
          status: 'pending'
        }])

      if (paymentError) throw paymentError

      toast.success('Payment initiated! Redirecting...')
      
      // Simulate payment processing
      setTimeout(() => {
        router.push(`/order-confirmation/${orderId}`)
      }, 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading checkout...</p>
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
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.order_items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.service.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{(item.unit_price * item.quantity).toFixed(2)} TND</p>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{order.total_amount.toFixed(2)} TND</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="card" onValueChange={(v) => setPaymentMethod(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="d17">
                      <DollarSign className="w-4 h-4 mr-2" />
                      D17
                    </TabsTrigger>
                    <TabsTrigger value="flouci">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Flouci
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="d17" className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to D17 to complete your payment.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium">Amount: {order.total_amount.toFixed(2)} TND</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="flouci" className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to Flouci to complete your payment.
                    </p>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium">Amount: {order.total_amount.toFixed(2)} TND</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  className="w-full mt-6"
                  size="lg"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay ${order.total_amount.toFixed(2)} TND`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
