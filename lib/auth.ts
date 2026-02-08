import crypto from 'crypto';

// Mock user database - in production, use a real database like Supabase or Neon
const users: Record<string, User> = {
  admin: {
    id: 'admin-001',
    email: 'admin@digitalservices.com',
    name: 'Admin User',
    password: hashPassword('admin123'),
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  demo: {
    id: 'user-001',
    email: 'demo@example.com',
    name: 'Demo User',
    password: hashPassword('demo123'),
    role: 'user',
    createdAt: new Date('2024-01-15'),
  },
};

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  token: string;
}

export function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, 'salt', 1000, 64, 'sha512')
    .toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  const computed = hashPassword(password);
  return computed === hash;
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function findUserByEmail(email: string): User | undefined {
  return Object.values(users).find((u) => u.email === email);
}

export function findUserById(id: string): User | undefined {
  return Object.values(users).find((u) => u.id === id);
}

export function createUser(
  email: string,
  password: string,
  name: string
): User {
  const userId = `user-${Date.now()}`;
  const newUser: User = {
    id: userId,
    email,
    name,
    password: hashPassword(password),
    role: 'user',
    createdAt: new Date(),
  };

  users[userId] = newUser;
  return newUser;
}

export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
