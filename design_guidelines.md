# Modern Clothing Shop Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from premium e-commerce platforms like Shopify, Zara, and ASOS to create a sophisticated, conversion-focused shopping experience.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light Mode: 18 15% 15% (charcoal) for text and headers
- Dark Mode: 0 0% 98% (off-white) for text
- Brand Accent: 215 25% 45% (sophisticated blue)

**Background Colors:**
- Light Mode: 0 0% 98% (clean white background)
- Dark Mode: 220 15% 8% (deep charcoal)
- Card backgrounds: Light mode 0 0% 100%, Dark mode 220 15% 12%

**Accent Usage:** Minimal - primarily for CTAs and interactive elements. Avoid competing accent colors.

### Typography
- **Primary Font:** Inter or Poppins from Google Fonts
- **Headings:** 600-700 weight, sized progressively (text-3xl to text-lg)
- **Body Text:** 400-500 weight, text-base and text-sm
- **Product Prices:** 600 weight for emphasis

### Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12
- Small gaps: gap-2, p-2
- Standard spacing: p-4, m-4, gap-4
- Section spacing: py-8, my-8
- Large containers: p-12, gap-12

### Component Library
**Navigation:** Clean header with logo, search bar, cart icon, and minimal menu
**Product Cards:** Image-first with hover effects, title, price, and quick add button
**Buttons:** Primary (filled), secondary (outline), and text variants
**Forms:** Clean inputs with proper focus states and validation
**Cart:** Slide-out drawer with item management
**Modals:** Product quick-view and checkout overlays

### Visual Treatment
**Gradients:** Subtle background gradients from 0 0% 98% to 220 10% 95% in light mode
**Shadows:** Soft drop shadows on cards and elevated elements
**Borders:** Minimal use - primarily for form inputs and card separations
**Contrast:** High contrast for text readability, medium contrast for secondary elements

## Key Design Principles
1. **Product-First:** Large, high-quality product imagery takes center stage
2. **Minimal Friction:** Streamlined shopping flow with clear CTAs
3. **Trust Signals:** Professional styling builds confidence in purchasing
4. **Mobile-Responsive:** Touch-friendly interactions and thumb-zone optimization
5. **Performance:** Fast loading with progressive image enhancement

## Images
**Hero Section:** Large hero banner (viewport height) showcasing seasonal collection with overlay text and CTA button (variant="outline" with blurred background)
**Product Images:** High-resolution square format (1:1 ratio) with hover zoom effects
**Category Banners:** Horizontal promotional images for collections
**Lifestyle Photos:** Models wearing products in authentic settings
**Brand Imagery:** Clean, minimalist photography style with consistent lighting

## Layout Structure
- **Header:** Logo left, search center, cart/account right
- **Hero:** Full-width banner with minimal text overlay
- **Product Grid:** 2-4 columns responsive grid with consistent spacing
- **Product Pages:** Large image gallery left, product details right
- **Footer:** Organized links, social media, and trust badges