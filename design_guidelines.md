# Restaurant Website Design Guidelines

## Design Approach: Reference-Based

**Primary References**: Uber Eats, DoorDash, Swiggy - platforms that excel at making food look appetizing and navigating dish catalogs
**Secondary Influences**: Modern restaurant portfolio sites with emphasis on food photography and clean presentation

**Core Principle**: Create hunger appeal through bold imagery while maintaining professional credibility and easy navigation.

## Typography System

**Font Stack**:
- Primary: "Playfair Display" (headings) - elegant, restaurant-appropriate serif
- Secondary: "Inter" (body, UI elements) - clean, highly legible sans-serif

**Hierarchy**:
- Hero/Main headings: 4xl to 6xl, bold weight
- Section headings: 2xl to 3xl, semibold
- Dish names: xl to 2xl, medium weight
- Body text: base to lg, regular weight
- Form labels/metadata: sm, medium weight

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Card padding: p-6
- Section spacing: py-16 to py-24
- Grid gaps: gap-6 to gap-8
- Form field spacing: space-y-4 to space-y-6

**Container Strategy**:
- Homepage hero: Full-width with max-w-7xl inner content
- Dish grid: max-w-7xl
- Upload form: max-w-2xl centered
- Content sections: max-w-6xl

## Component Library

### Homepage Components

**Hero Section (80vh)**:
- Full-width background image of signature dish (high-quality food photography)
- Overlay with restaurant name and tagline
- Primary CTA button with blur backdrop
- No hover effects on hero CTA - inherent button states only

**Dish Grid**:
- 3-column layout (lg), 2-column (md), 1-column (mobile)
- Card design:
  - Square aspect ratio dish image (1:1)
  - Image hover: subtle scale (1.05) with smooth transition
  - Below image: dish name, weight, price, category badge
  - Card elevation with soft shadow
  - Rounded corners (rounded-xl)

**Navigation**:
- Sticky header with logo, menu items, "Add Dish" admin button
- Transparent on hero, solid background on scroll
- Mobile: Hamburger menu

**Footer**:
- 3-column layout: About, Contact, Social Links
- Opening hours, location, phone number
- Newsletter signup form
- Social media icons

### Upload Page Components

**Page Layout**:
- Centered form container (max-w-2xl)
- Page title and breadcrumb navigation
- Form section with clear visual grouping

**Form Fields**:
1. Dish Image Upload
   - Large drag-and-drop zone with preview
   - Cloudinary widget integration area
   - Image preview with remove option
   - Aspect ratio guide overlay

2. Text Fields:
   - Dish Name (required)
   - Weight/Serving Size
   - Price
   - Category (dropdown: Appetizer, Main Course, Dessert, Beverages)
   - Description (textarea, 4 rows)

3. Form Actions:
   - Primary "Publish Dish" button
   - Secondary "Save as Draft" button
   - Cancel link

**Field Design**:
- Consistent height (h-12 for inputs, h-32 for textarea)
- Border with focus state enhancement
- Floating labels or top-aligned labels
- Required field indicators
- Validation error states with message below field

## Images

**Hero Image**: Full-width, high-quality photograph of the restaurant's signature dish (e.g., beautifully plated biryani with garnish, steam, and vibrant colors). Professional food photography with warm lighting and shallow depth of field.

**Dish Cards**: Each dish needs a square (1:1) professional photo with consistent lighting and styling. Clean white or natural wooden background to maintain consistency across the catalog.

**Upload Page**: Placeholder illustration or icon for the drag-and-drop zone when empty.

## Visual Patterns

**Dish Cards**:
- Consistent card height regardless of content
- Truncate long descriptions with ellipsis
- Price prominently displayed
- Category badge in top-right corner of image

**Buttons**:
- Primary: Solid fill, semibold text, px-8 py-3
- Secondary: Outline style, same padding
- Hero CTA: Larger (px-12 py-4) with backdrop blur

**Forms**:
- Clear visual separation between field groups
- Generous whitespace (space-y-6)
- Help text below fields in muted tone
- Success/error states clearly indicated

## Animations

**Minimal Motion**:
- Dish card image scale on hover (transform scale-105, duration 300ms)
- Form field focus transitions (duration 200ms)
- Navigation scroll state change (duration 300ms)
- NO page transitions, parallax, or scroll-triggered animations

## Responsive Behavior

- Desktop (lg): 3-column dish grid, full navigation
- Tablet (md): 2-column grid, condensed navigation
- Mobile: Single column, hamburger menu, stacked form layout