# AtlasVault Design System

## Brand Overview

**AtlasVault** is a premium digital services marketplace for Tunisia, offering curated access to international streaming subscriptions, telecom services, gaming credits, and business tools—all in one trusted platform.

## Color Palette

The AtlasVault color palette is inspired by Tunisian identity and Mediterranean aesthetics:

| Role | Color Name | Hex Code | Usage |
|------|-----------|----------|-------|
| Primary Brand | Sidi Bou Cobalt | `#0066CC` | Buttons, links, primary CTAs, accents |
| Pure Base | Mediterranean White | `#FFFFFF` | Backgrounds, cards, clean spaces |
| Accent Blue | Horizon Sky | `#4A90E2` | Secondary highlights, hovers, gradients |
| Dark Text | Deep Indigo | `#1A2B48` | Primary text, dark foreground |
| Success Action | Emerald Mint | `#2ECC71` | Success states, confirmations |
| Neutral Text | Muted Gray | `#666666` | Secondary text, descriptions |
| Light Background | Soft Gray | `#F5F5F5` | Muted backgrounds, disabled states |
| Borders | Edge Gray | `#E5E5E5` | Dividers, borders, subtle separators |

## Category Branding

Each service category has a unique gradient identity:

### The Vault (Streaming)
- **Gradient:** `from-[#0066CC] to-[#4A90E2]` (Blues)
- **Icon:** Film/Play icon
- **Services:** Netflix, Disney+, Spotify, Apple TV+, Amazon Prime, Max

### Telecom Hub
- **Gradient:** `from-[#2ECC71] to-[#27AE60]` (Greens)
- **Icon:** Smartphone icon
- **Services:** Ooredoo, Orange, TT, Internet plans, Mobile top-ups

### Gaming Corner
- **Gradient:** `from-[#FF6B35] to-[#FF4500]` (Oranges/Reds)
- **Icon:** Gamepad icon
- **Services:** Free Fire, PUBG, Steam, PlayStation, Xbox, Game Pass

### Business Suite
- **Gradient:** `from-[#5B4A9F] to-[#0066CC]` (Purple to Blue)
- **Icon:** Briefcase icon
- **Services:** Canva Pro, ChatGPT Plus, Hosting, Domains, Adobe, Notion

## Typography

- **Font Family:** Geist (Google Font)
- **Headings:** Bold weights (600-900) for hierarchy
- **Body:** Regular weight (400) for readability
- **Line Height:** 1.5 for comfortable reading

## Layout Principles

- **Mobile-First:** All designs work perfectly on mobile first
- **Responsive Grid:** 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- **Spacing:** Consistent use of Tailwind spacing scale (gap-4, gap-6, gap-8, etc.)
- **Container:** Max-width of 1280px (max-w-7xl) for optimal reading

## Key Features

✅ **Sticky Navigation** - Always accessible header with cart and account links
✅ **Category-Specific Styling** - Each category has unique gradients and theming
✅ **Responsive Cards** - Product cards adapt beautifully to all screen sizes
✅ **Hover States** - Interactive feedback on all clickable elements
✅ **Trust Indicators** - Statistics and feature highlights build confidence
✅ **Call-to-Action Focus** - Clear, bold CTAs throughout the user journey

## Pages & Sections

### Home Page (/)
- Navigation with logo and auth links
- Hero section with main CTA
- 4-column category grid with featured items
- Trust statistics section
- Features/benefits section
- Final CTA section
- Rich footer with links

### Products Page (/products)
- Sticky category tabs for easy navigation
- Category header with gradient branding
- Product grid (1-3 columns responsive)
- Product cards with rating, price, and add-to-cart
- Real mock data for all categories

### Authentication
- Signup/Login pages with consistent styling
- Form validation and error handling
- Secure Supabase integration

### Cart & Checkout
- Shopping cart with item management
- Multi-step checkout process
- Payment method selection
- Order confirmation

## Future Enhancements

- Dark mode toggle
- User preferences and wishlists
- Advanced filtering and search
- Category-specific promotions
- Admin dashboard for order management
- Real payment gateway integration (D17, Flouci, Stripe)
