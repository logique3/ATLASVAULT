'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock cart data - replace with actual state management (Zustand/Redux)
interface CartItemType {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 'netflix-premium',
      name: 'Netflix Premium',
      price: 15.99,
      category: 'The Vault',
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100',
    },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(10);
      toast.success('Coupon applied! 10% discount');
      setCouponCode('');
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      toast.success('Coupon applied! 20% discount');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">{cartItems.length} item(s) in cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`}>
                      <div className="bg-muted rounded-lg overflow-hidden flex-shrink-0 h-24 w-24">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <Link href={`/product/${item.id}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            {(item.price * item.quantity).toFixed(2)} TND
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border-x border-border outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 overflow-hidden">
              <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                {/* Pricing Breakdown */}
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} TND</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount ({discount}%)</span>
                      <span>-{discountAmount.toFixed(2)} TND</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-foreground text-lg">
                    <span>Total</span>
                    <span className="text-primary">{total.toFixed(2)} TND</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Coupon Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={applyCoupon}
                      disabled={!couponCode}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try: SAVE10 or SAVE20</p>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold">
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Security Info */}
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <p className="text-xs font-medium text-foreground">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We accept D17, Flouci, and card payments.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>✓</span>
                    <span>Free delivery on all orders</span>
                  </div>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>✓</span>
                    <span>Instant account activation</span>
                  </div>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>✓</span>
                    <span>24/7 WhatsApp support</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
