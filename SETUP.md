# AtlasVault - Tunisian E-Commerce Platform Setup Guide

## Overview
AtlasVault is a modern e-commerce platform built with Next.js and Supabase, supporting multiple payment methods including D17, Flouci, and card payments.

## Architecture

### Database Schema
The application uses PostgreSQL (via Supabase) with the following main tables:

- **users** (managed by Supabase Auth)
- **profiles** - User profile information
- **services** - Products/services catalog
- **orders** - Order records
- **order_items** - Items within each order
- **payments** - Payment transaction records

### Key Features

1. **Authentication**
   - User signup and login via Supabase Auth
   - Profile management
   - Secure session handling

2. **Product Catalog**
   - Browse available services
   - Search and filter capabilities
   - Detailed service information

3. **Shopping Cart**
   - Add/remove items
   - Adjust quantities
   - Real-time cart updates

4. **Checkout System**
   - Order creation
   - Multiple payment method support (Card, D17, Flouci)
   - Order confirmation

5. **User Dashboard**
   - View account information
   - Order history and status tracking
   - Profile management

## Environment Setup

### Required Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Getting Supabase Credentials

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and API keys from the settings
3. Add them to your environment variables

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see above)

4. Run the database initialization script (already executed):
   ```bash
   npx supabase db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

## File Structure

```
/app
  ├── page.tsx                 # Home/landing page
  ├── login/page.tsx          # Login page
  ├── signup/page.tsx         # Sign up page
  ├── products/page.tsx       # Services catalog
  ├── cart/page.tsx           # Shopping cart
  ├── checkout/[orderId]      # Payment/checkout
  ├── order-confirmation/     # Order success page
  ├── dashboard/page.tsx      # User dashboard
  ├── api/
  │   ├── orders/route.ts     # Orders API
  │   └── payments/route.ts   # Payments API
  └── globals.css             # Global styles

/lib
  └── supabase.ts            # Supabase client and auth helpers

/scripts
  └── init-supabase.sql      # Database schema
```

## Payment Integration (To Be Configured)

### D17 Integration
- Requires D17 API credentials
- Implement webhook handlers for payment confirmation
- Add D17 SDK/API calls in checkout flow

### Flouci Integration
- Requires Flouci merchant account
- Implement Flouci API integration
- Add phone number validation for Flouci payments

### Card Payment (Stripe/Other)
- Requires payment processor account
- Add card element component
- Implement secure payment processing

## Database Tables Details

### profiles
```sql
- id (UUID, Primary Key)
- full_name (Text)
- email (Text)
- phone (Text)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### services
```sql
- id (UUID, Primary Key)
- name (Text)
- description (Text)
- price (Decimal)
- category (Text)
- image_url (Text, optional)
- rating (Float, optional)
- reviews_count (Integer, optional)
- created_at (Timestamp)
```

### orders
```sql
- id (UUID, Primary Key)
- user_id (UUID, FK to users)
- total_amount (Decimal)
- status (Text: pending, processing, completed, cancelled)
- payment_method (Text: card, d17, flouci)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### order_items
```sql
- id (UUID, Primary Key)
- order_id (UUID, FK to orders)
- service_id (UUID, FK to services)
- quantity (Integer)
- unit_price (Decimal)
- created_at (Timestamp)
```

### payments
```sql
- id (UUID, Primary Key)
- order_id (UUID, FK to orders)
- amount (Decimal)
- method (Text)
- transaction_id (Text, optional)
- status (Text: pending, completed, failed)
- created_at (Timestamp)
```

## API Endpoints

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders?userId=xxx` - Get user's orders

### Payments
- `POST /api/payments` - Create payment record
- `GET /api/payments?orderId=xxx` - Get order's payments

## Security Features

1. **Row Level Security (RLS)**
   - Users can only view their own data
   - Profiles table protected
   - Orders visible only to order owner

2. **Authentication**
   - Supabase Auth handles password security
   - Session management with HTTP-only cookies

3. **API Security**
   - Service role key for server-side operations
   - Input validation on all endpoints
   - CORS configuration for public endpoints

## Next Steps

1. Configure payment gateway integrations (D17, Flouci, Stripe)
2. Add email notifications for orders
3. Implement order fulfillment system
4. Add admin dashboard for order management
5. Implement inventory management
6. Add customer support/ticketing system
7. Setup analytics and monitoring

## Troubleshooting

### Supabase Connection Issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure API keys have correct permissions

### Authentication Failures
- Clear browser cookies and cache
- Verify email confirmation is enabled in Supabase
- Check user exists in auth.users table

### Database Errors
- Ensure all tables are created via init script
- Check RLS policies are configured
- Verify foreign key relationships

## Support

For issues with:
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
