# AtlasVault Authentication & User Management System

## Overview

A complete authentication and user management system has been implemented for the AtlasVault digital services marketplace. The system supports two user roles: Admin and User, with features for account management, order tracking, and favorites.

## System Components

### 1. Authentication Core (`lib/auth.ts`)
- Password hashing and verification using PBKDF2
- Token generation for sessions
- User registration and login validation
- Email and password validation

**Demo Credentials:**
- Admin: `admin@digitalservices.com` / `admin123`
- User: `demo@example.com` / `demo123`

### 2. User Context (`lib/user-context.tsx`)
Global state management for user sessions accessible throughout the application via `useUser()` hook.

**Features:**
- Persistent login (localStorage)
- Login/Signup methods
- Logout functionality
- Role-based access indicators

### 3. API Routes

#### Login (`app/api/auth/login/route.ts`)
- POST endpoint for user authentication
- Returns user session with token
- Email/password validation

#### Signup (`app/api/auth/signup/route.ts`)
- POST endpoint for new user registration
- Email uniqueness check
- Password strength validation
- Returns user session

### 4. Authentication Pages

#### Login Page (`app/auth/login/page.tsx`)
- Email and password input fields
- Error handling and display
- Demo credentials helper
- Link to signup page

#### Signup Page (`app/auth/signup/page.tsx`)
- Full name, email, password inputs
- Real-time password validation
- Password match verification
- Success feedback with visual indicators

### 5. User Account Management (`app/account/page.tsx`)
Complete account dashboard with:
- User profile information
- Order history with status tracking
- Favorite services management
- Order details and actions

### 6. User Data System (`lib/user-data.ts`)
Mock database for:
- User profiles
- Order management
- Favorite tracking

**Note:** In production, migrate to Supabase, Neon, or another database.

### 7. WhatsApp Order Integration
#### Message Formatter (`lib/whatsapp-formatter.ts`)
- Formats orders into WhatsApp-friendly messages
- Generates WhatsApp links with pre-filled messages
- Clipboard and download functionality

#### Order Confirmation Modal (`components/order-confirmation-modal.tsx`)
- Preview order details
- Copy message to clipboard
- Download order as text
- Send directly via WhatsApp

## User Flows

### Registration Flow
1. User clicks "Sign Up" in header
2. Fills in name, email, password
3. System validates inputs
4. Account created
5. User automatically logged in
6. Redirected to `/account`

### Login Flow
1. User clicks "Sign In" in header
2. Enters email and password
3. System verifies credentials
4. Session created and stored in localStorage
5. User redirected to `/account`
6. User menu displays in header

### Order Placement Flow
1. User browses services
2. Selects service and quantity
3. Clicks "Order via WhatsApp"
4. Order confirmation modal opens
5. User reviews order details
6. Sends message to WhatsApp
7. Support team confirms order
8. User selects payment method (D17, Flouci, Card)
9. Order appears in user's order history

### Favorites Flow
1. User adds service to favorites (heart icon)
2. Service stored in user profile
3. Favorites tab in account shows all saved services
4. One-click access to favorite services

## Header Integration

The header component now displays:
- **Authenticated Users:** User avatar dropdown with:
  - User name and email
  - "My Account" link
  - "Admin Dashboard" link (if admin)
  - "Sign Out" button
  
- **Unauthenticated Users:** Sign In / Sign Up buttons

## Protected Routes

Add protection to pages that require authentication:

```tsx
'use client';

import { useUser } from '@/lib/user-context';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading]);

  if (isLoading || !user) return null;

  return <div>{/* Protected content */}</div>;
}
```

## Admin Features

Admin users have access to:
- `/admin` - Admin dashboard
- User management (future enhancement)
- Service management
- Category management
- Promo and offers management

## Future Enhancements

### Database Migration
```bash
# Set up Supabase integration for production
# Replace mock data system with real database
# Enable persistent data storage
```

### Additional Features
- Password reset via email
- Two-factor authentication
- User profile editing
- Saved payment methods
- Order notifications
- Review and ratings system
- Referral program

### Security Improvements
- HTTPS only cookies
- CSRF protection
- Rate limiting on auth endpoints
- Account lockout after failed attempts
- Encrypted password storage (already using PBKDF2)

## API Reference

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "userId": "user-001",
  "email": "user@example.com",
  "name": "User Name",
  "role": "user",
  "token": "token-string"
}
```

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}

Response:
{
  "userId": "user-002",
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user",
  "token": "token-string"
}
```

## Error Handling

The system handles:
- Invalid email format
- Weak passwords
- Email already registered
- Invalid login credentials
- Network errors
- Session expiration

All errors display user-friendly messages via toast notifications.

## Testing Credentials

### Admin Account
- Email: `admin@digitalservices.com`
- Password: `admin123`

### Demo User Account
- Email: `demo@example.com`
- Password: `demo123`

## File Structure

```
lib/
  auth.ts - Core authentication utilities
  user-context.tsx - User state management
  user-data.ts - User profile and order data
  whatsapp-formatter.ts - WhatsApp message formatting

app/
  auth/
    login/page.tsx - Login page
    signup/page.tsx - Signup page
  account/page.tsx - User account dashboard
  api/auth/
    login/route.ts - Login endpoint
    signup/route.ts - Signup endpoint

components/
  header.tsx - Updated with auth controls
  order-confirmation-modal.tsx - Order WhatsApp integration
```

## Next Steps

1. Test all authentication flows
2. Verify error handling
3. Test WhatsApp integration
4. Set up database for persistent storage
5. Implement email verification
6. Add password reset functionality
7. Enable admin user management
