'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, CheckCircle, Clock, AlertCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';

interface ProductDetailContentProps {
  product: any;
  slug: string;
}

export function ProductDetailContent({ product, slug }: ProductDetailContentProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleOrderViaWhatsApp = () => {
    const message = `Hello! I want to order:\n\n📦 Product: ${product.name}\n💰 Price: ${product.price} TND\n📊 Quantity: ${quantity}\n\nPlease help me complete this order.`;
    const whatsappUrl = `https://wa.me/21650000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: slug
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary">{product.categoryName}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-xl overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.categoryName}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Price & Stock Status */}
              <div className="mb-6 p-4 border-2 border-primary rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  {product.price.toFixed(2)} TND
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {product.inStock ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-success font-medium">In Stock</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-destructive font-medium">Out of Stock</span>
                    </>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 3).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add to Cart & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border-x border-border outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="px-6"
                  title="Add to favorites"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                <Clock className="w-4 h-4" />
                <span>Account activated within 5-10 minutes after payment</span>
              </div>

              {/* WhatsApp Ordering Info Box */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                <div className="flex gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Continue your order on WhatsApp</p>
                    <p>All payment methods (D17, Flouci, Card) are available through WhatsApp. Our support team is ready to assist you 24/7.</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Ordering */}
              <Button
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                onClick={handleOrderViaWhatsApp}
              >
                <MessageCircle className="w-5 h-5" />
                Continue Order on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Ordering Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">How to Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.orderSteps.map((step: any) => (
              <div key={step.number} className="relative">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold mb-4 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-foreground text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
                {step.number < product.orderSteps.length && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span className="font-medium text-foreground">{spec.label}</span>
                <span className="text-muted-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">All Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {product.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground text-left">{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openFaqIndex === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="border-t border-border p-4 bg-muted/50">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.relatedProducts.map((relProd: any) => (
                <Link key={relProd.id} href={`/product/${relProd.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                    <div className="bg-muted h-48 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt={relProd.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{relProd.name}</h3>
                      <p className="text-xl font-bold text-primary">{relProd.price.toFixed(2)} TND</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
