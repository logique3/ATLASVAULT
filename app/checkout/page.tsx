'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, Lock, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

type CheckoutStep = 'review' | 'billing' | 'payment' | 'confirmation';

const paymentMethods = [
  {
    id: 'd17',
    name: 'D17',
    description: 'Secure Tunisian payment gateway',
    icon: '💳',
  },
  {
    id: 'flouci',
    name: 'Flouci',
    description: 'Fast mobile payment solution',
    icon: '📱',
  },
  {
    id: 'card',
    name: 'Card Payment',
    description: 'Visa & Mastercard',
    icon: '🏦',
  },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('review');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const orderItems = [
    {
      id: 'netflix-premium',
      name: 'Netflix Premium',
      price: 15.99,
      quantity: 1,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setStep('confirmation');
      setIsProcessing(false);
      toast.success('Order completed successfully!');
    }, 2000);
  };

  const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Secure Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[
              { id: 'review', label: 'Review' },
              { id: 'billing', label: 'Billing' },
              { id: 'payment', label: 'Payment' },
              { id: 'confirmation', label: 'Confirm' },
            ].map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    step === s.id || (step === 'confirmation' && idx < 3)
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {idx < 3 && step === 'confirmation' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    idx < 3 && (step === 'confirmation' || ['review', 'billing', 'payment'].indexOf(step) > idx)
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              </div>
            ))}
            <div className="flex items-center justify-center w-10 h-10 rounded-full font-semibold bg-muted text-muted-foreground">
              4
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Review Step */}
            {step === 'review' && (
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
                    <h2 className="text-2xl font-bold text-foreground">Order Review</h2>
                    <p className="text-muted-foreground mt-1">Review your items before proceeding</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary">{(item.price * item.quantity).toFixed(2)} TND</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button
                  size="lg"
                  onClick={() => setStep('billing')}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Continue to Billing
                </Button>
              </div>
            )}

            {/* Billing Step */}
            {step === 'billing' && (
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
                    <h2 className="text-2xl font-bold text-foreground">Billing Information</h2>
                    <p className="text-muted-foreground mt-1">Enter your contact and delivery details</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setStep('review')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep('payment')}
                    disabled={!allFieldsFilled}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
                    <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
                    <p className="text-muted-foreground mt-1">Choose your preferred payment option</p>
                  </div>
                  <div className="p-6 space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              <span className="text-2xl">{method.icon}</span>
                              {method.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              selectedPayment === method.id
                                ? 'border-primary bg-primary'
                                : 'border-muted-foreground'
                            }`}
                          >
                            {selectedPayment === method.id && (
                              <Check className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="bg-blue-50 border-blue-200 p-4">
                  <div className="flex gap-3">
                    <Lock className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Secure Payment</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your payment information is encrypted and secured using industry-standard protocols.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setStep('billing')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!selectedPayment || isProcessing}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {step === 'confirmation' && (
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="p-6 sm:p-12 text-center bg-gradient-to-b from-success/10 to-background">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-success" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your payment has been processed successfully.
                    </p>

                    <div className="bg-card border border-border rounded-lg p-6 mb-6 text-left space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Order Number:</span>
                        <span className="font-bold text-foreground">#ORD-2024-001234</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="text-xl font-bold text-primary">{total.toFixed(2)} TND</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="font-medium text-foreground capitalize">
                          {paymentMethods.find(m => m.id === selectedPayment)?.name}
                        </span>
                      </div>
                    </div>

                    <Card className="bg-blue-50 border-blue-200 p-4 mb-6">
                      <h3 className="font-semibold text-foreground mb-2">What's Next?</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground text-left">
                        <li>✓ Confirmation email sent to {formData.email}</li>
                        <li>✓ Account details will arrive within 5-10 minutes</li>
                        <li>✓ Check your email for login credentials</li>
                        <li>✓ Need help? Contact us on WhatsApp</li>
                      </ul>
                    </Card>
                  </div>
                </Card>

                <div className="flex gap-3 flex-col sm:flex-row">
                  <Link href="/products" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="flex-1">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                      View My Orders
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 overflow-hidden">
              <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name} (×{item.quantity})</span>
                      <span className="font-medium text-foreground">{(item.price * item.quantity).toFixed(2)} TND</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (5%)</span>
                    <span>{tax.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground text-lg border-t border-border pt-2">
                    <span>Total</span>
                    <span className="text-primary">{total.toFixed(2)} TND</span>
                  </div>
                </div>

                <Card className="bg-success/10 border-success/20 p-4">
                  <p className="text-xs text-foreground font-medium mb-2">Benefits Included:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ Instant account activation</li>
                    <li>✓ 24/7 WhatsApp support</li>
                    <li>✓ Money-back guarantee</li>
                  </ul>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
