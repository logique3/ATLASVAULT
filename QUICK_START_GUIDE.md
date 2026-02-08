# Quick Start Guide - Digital Services Platform

## Admin Panel Access

### 1. Managing Services
**Navigate to:** `/admin` → **Services** tab

**Actions:**
- **View All Services:** Displays table with name, category, price, and status
- **Search Services:** Use search box to filter by name or slug
- **Add New Service:** Click "Add Service" button
  - Fill in: Name, Slug, Price, Category, Description
  - Toggle: In Stock, Active status
  - Click "Add Service" to save
- **Edit Service:** Click edit icon, modify details, click "Update Service"
- **Delete Service:** Click trash icon, confirm deletion

**Example Service:**
- Name: Netflix Premium
- Slug: netflix-premium
- Price: 15.99 TND
- Category: The Vault
- Description: 4K streaming on 4 screens

---

### 2. Managing Categories
**Navigate to:** `/admin` → **Categories** tab

**Actions:**
- **View All Categories:** Card-based grid layout
- **Add New Category:** Click "Add Category" button
  - Fill in: Name, Description
  - Select Icon: Choose from 10 emoji options
  - Select Color: Pick from color palette (Blue, Green, Orange, Purple, Pink, Teal)
  - Toggle: Active status
  - Click "Add Category" to save
- **Edit Category:** Click "Edit" on card, modify details
- **Delete Category:** Click trash icon on card

**Category Hierarchy:**
- The Vault (Streaming services)
- Telecom Hub (Internet & mobile top-ups)
- Gaming Corner (Gaming credits & subscriptions)
- Business Suite (Professional tools)

---

### 3. Managing Promotions
**Navigate to:** `/admin` → **Promos** tab

**Actions:**
- **View Active Promos:** Card layout with discount display
- **Create Promo:** Click "Create Promo" button
  - Fill in: Title, Discount Amount
  - Select Type: Percentage (%) or Fixed (TND)
  - Select Applicable To: All Products, Specific Product, or Specific Category
  - Set Dates: Start Date and End Date
  - Toggle: Active status
  - Click "Create Promo" to save
- **Edit Promo:** Click "Edit" on card
- **Delete Promo:** Click trash icon

**Example Promotion:**
- Title: Netflix 50% Off
- Discount: 50%
- Type: Percentage
- Applicable To: Netflix Premium
- Start: 2024-02-01
- End: 2024-02-28

---

### 4. Managing Offers
**Navigate to:** `/admin` → **Offers** tab

**Actions:**
- **View All Offers:** List layout with offer details
- **Create Offer:** Click "Create Offer" button
  - Fill in: Offer Name, Description, Condition
  - Select Priority: High, Medium, or Low
  - Set Expiry: Expiration date
  - Optional: Enable "Limited Quantity" and set number of uses
  - Toggle: Active status
  - Click "Create Offer" to save
- **Edit Offer:** Click "Edit" button
- **Delete Offer:** Click trash icon

**Example Offer:**
- Name: Bundle Deal
- Description: Buy 2 Get 1 Free
- Condition: Minimum 2 products
- Priority: High
- Expires: 2024-02-28
- Limited Quantity: 100 uses

---

## Customer Features

### 1. Browsing Services
**Navigate to:** `/products`

**Features:**
- **Category Tabs:** Switch between Vault, Telecom Hub, Gaming Corner, Business Suite
- **Filter Sidebar:**
  - Sort by: Popular, Price (Low to High), Price (High to Low), Rating, Newest
  - Price Range: Slider to filter by price
  - Minimum Rating: Filter by star rating
- **Product Cards:** 
  - Service name and description
  - Price display
  - Rating and review count
  - Add to Cart / Add to Favorites buttons

---

### 2. Service Details Page
**Access from:** Click on any service from `/products`

**Features:**
- **Service Information:**
  - High-resolution product image
  - Detailed description
  - Price and stock status
  - Key features list
- **How to Order:** Step-by-step ordering process
- **WhatsApp Ordering:**
  - Prominent "Continue Order on WhatsApp" button
  - Instructions: "All payment methods available on WhatsApp"
  - Support availability: "24/7 Support Available"
  - Pre-filled message with service details
- **Specifications:** Technical specs table
- **All Features:** Complete features list
- **FAQ Section:** Expandable Q&A
- **Related Products:** Recommendations

---

## WhatsApp Integration

### How It Works
1. Customer clicks "Continue Order on WhatsApp"
2. Pre-populated message is sent including:
   - Product name
   - Price
   - Quantity
   - Order request

### Message Template
```
Hello! I want to order:

📦 Product: Netflix Premium
💰 Price: 15.99 TND
📊 Quantity: 1

Please help me complete this order.
```

### Payment Methods Available
- D17 (Local payment)
- Flouci (Mobile payment)
- Card (International payment)

---

## Data Synchronization

### API Endpoints
All data changes sync through REST API:

**Services:**
- `GET /api/services` - Fetch services
- `GET /api/services?category=vault` - Filter by category
- `GET /api/services?active=true` - Active services only
- `POST /api/services` - Create/Update service

**Categories:**
- `GET /api/categories` - Fetch all categories
- `GET /api/categories?active=true` - Active categories only
- `POST /api/categories` - Create/Update category

**Promos:**
- `GET /api/promos` - Fetch promos
- `GET /api/promos?active=true` - Active promos only
- `POST /api/promos` - Create/Update promo

**Offers:**
- `GET /api/offers` - Fetch offers
- `GET /api/offers?active=true` - Active offers only
- `POST /api/offers` - Create/Update offer

### Using the Sync Hook
```typescript
import { useAdminSync } from '@/hooks/use-admin-sync';

const { fetchServices, saveService } = useAdminSync();

// Fetch services
const services = await fetchServices('vault', true); // category, activeOnly

// Save service
const newService = await saveService({
  name: 'Netflix Premium',
  slug: 'netflix-premium',
  price: 15.99,
  category: 'vault',
  active: true
});
```

---

## Common Tasks

### Add a New Streaming Service
1. Go to `/admin` → Services tab
2. Click "Add Service"
3. Fill in details (name, slug, price, etc.)
4. Select category: "The Vault"
5. Check "In Stock" and "Active"
6. Click "Add Service"

### Launch a Flash Sale
1. Go to `/admin` → Promos tab
2. Click "Create Promo"
3. Title: "[Service Name] [Discount]% Off"
4. Discount: Enter percentage
5. Set start and end dates
6. Select applicable service/category
7. Click "Create Promo"

### Create Bundle Offer
1. Go to `/admin` → Offers tab
2. Click "Create Offer"
3. Name: "Bundle Deal"
4. Description: "Buy 2 Get 1 Free"
5. Set priority and expiration
6. Enable limited quantity if needed
7. Click "Create Offer"

### View Customer-Facing Content
1. Go to `/products` to browse services
2. Click any service for details
3. View WhatsApp ordering section
4. Check pricing and features
5. See FAQ and specifications

---

## Troubleshooting

### Service Not Appearing
- Check if service is marked as "Active"
- Verify category is set correctly
- Refresh the page

### WhatsApp Not Opening
- Check if WhatsApp is installed on device
- Verify WhatsApp Business account number is configured
- Check if phone number has WhatsApp enabled

### Promo Not Applied
- Check promo start/end dates
- Verify promo is marked as "Active"
- Confirm applicable product/category is correct

### Offer Not Showing
- Check if offer is marked as "Active"
- Verify expiration date hasn't passed
- Check limited quantity hasn't been exceeded

---

## Support
For issues or questions:
1. Check this guide first
2. Review the IMPLEMENTATION_SUMMARY.md for technical details
3. Contact support via WhatsApp (24/7 available)

---

**Last Updated:** February 2025
**Version:** 1.0
