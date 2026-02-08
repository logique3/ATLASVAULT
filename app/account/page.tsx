'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingBag, LogOut, Settings, ChevronRight, Calendar, DollarSign } from 'lucide-react';
import { getUserProfile, removeFavorite, isFavorite } from '@/lib/user-data';
import { PRODUCTS_DATABASE } from '@/lib/products-db';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useUser();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      const profile = getUserProfile(user.userId);
      
      // Load favorite products
      const favorites = profile.favorites
        .map((id) => PRODUCTS_DATABASE[id])
        .filter(Boolean);
      setFavoriteProducts(favorites);

      // Load orders
      setOrders(profile.orders);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleRemoveFavorite = (serviceId: string) => {
    removeFavorite(user.userId, serviceId);
    setFavoriteProducts(
      favoriteProducts.filter((p) => p.id !== serviceId)
    );
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Account
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* User Info Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-semibold text-foreground">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Type</p>
                  <p className="font-semibold text-foreground capitalize">
                    {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No orders yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your orders here
                  </p>
                  <Button asChild>
                    <Link href="/products">Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {order.serviceName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id.slice(-8)}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Total Price
                          </p>
                          <p className="font-semibold text-foreground flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-primary" />
                            {order.totalPrice.toFixed(2)} TND
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Date
                          </p>
                          <p className="font-semibold text-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">
                            Payment Method
                          </p>
                          <p className="font-semibold text-foreground">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Download Invoice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            {favoriteProducts.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Add your favorite services to keep them handy
                  </p>
                  <Button asChild>
                    <Link href="/products">Explore Services</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <Heart className="w-5 h-5 text-destructive fill-destructive flex-shrink-0" />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <p className="text-lg font-bold text-primary">
                          {product.price.toFixed(2)} TND
                        </p>
                        <div className="flex gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <Link href={`/product/${product.slug}`}>
                              View
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFavorite(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
