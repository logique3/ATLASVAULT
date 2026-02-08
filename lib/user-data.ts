// Mock user data storage - in production, use a database
// This is stored in memory and will reset on server restart
// For persistence, migrate to Supabase or a database

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'D17' | 'Flouci' | 'Card';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  favorites: string[]; // service IDs
  orders: Order[];
}

const userProfiles: Record<string, UserProfile> = {
  'user-001': {
    userId: 'user-001',
    favorites: ['netflix-premium', 'spotify-premium'],
    orders: [
      {
        id: 'order-001',
        userId: 'user-001',
        serviceId: 'netflix-premium',
        serviceName: 'Netflix Premium',
        price: 15.99,
        quantity: 1,
        totalPrice: 15.99,
        status: 'completed',
        paymentMethod: 'Card',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
      },
    ],
  },
};

export function getUserProfile(userId: string): UserProfile {
  if (!userProfiles[userId]) {
    userProfiles[userId] = {
      userId,
      favorites: [],
      orders: [],
    };
  }
  return userProfiles[userId];
}

export function addFavorite(userId: string, serviceId: string): void {
  const profile = getUserProfile(userId);
  if (!profile.favorites.includes(serviceId)) {
    profile.favorites.push(serviceId);
  }
}

export function removeFavorite(userId: string, serviceId: string): void {
  const profile = getUserProfile(userId);
  profile.favorites = profile.favorites.filter((id) => id !== serviceId);
}

export function addOrder(
  userId: string,
  serviceId: string,
  serviceName: string,
  price: number,
  quantity: number,
  paymentMethod: 'D17' | 'Flouci' | 'Card'
): Order {
  const profile = getUserProfile(userId);
  const order: Order = {
    id: `order-${Date.now()}`,
    userId,
    serviceId,
    serviceName,
    price,
    quantity,
    totalPrice: price * quantity,
    status: 'pending',
    paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  profile.orders.push(order);
  return order;
}

export function getOrders(userId: string): Order[] {
  const profile = getUserProfile(userId);
  return profile.orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateOrderStatus(
  userId: string,
  orderId: string,
  status: Order['status']
): Order | null {
  const profile = getUserProfile(userId);
  const order = profile.orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }
  return null;
}

export function isFavorite(userId: string, serviceId: string): boolean {
  const profile = getUserProfile(userId);
  return profile.favorites.includes(serviceId);
}
