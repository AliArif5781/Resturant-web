# Restaurant Menu Management System

## Overview

A full-stack restaurant website application that allows users to browse dishes and upload new menu items with images. The application features a modern, food-focused design inspired by platforms like Uber Eats and DoorDash, emphasizing visual appeal and easy navigation. Built with React, Express, and Firebase, with Cloudinary for image hosting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with two main routes:
- `/` - Home page displaying dish catalog
- `/upload` - Dish upload form

**State Management**: TanStack Query (React Query) for server state management with infinite stale time and disabled refetching

**UI Components**: Shadcn/ui component library built on Radix UI primitives
- Uses "new-york" style variant
- Custom Tailwind configuration with neutral base color
- Design system emphasizes food photography with hero images and card-based layouts

**Design System**:
- Typography: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- Layout: Responsive grid system (3-column on desktop, 2-column on tablet, 1-column on mobile)
- Spacing: Tailwind's spacing scale with specific preferences (p-6 for cards, py-16/py-24 for sections)
- Visual hierarchy emphasizes dish imagery with square aspect ratios and hover effects

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Request Processing**:
- JSON body parsing with raw body preservation for webhook verification
- Multipart form data handling via Multer (memory storage)
- Request logging middleware that captures duration and response data

**API Structure**:
- `GET /api/dishes` - Retrieve all dishes from Firebase
- `POST /api/dishes` - Upload new dish with image validation and Cloudinary upload

**Development Setup**: 
- Vite integration for HMR in development
- Separate build process for client (Vite) and server (esbuild)
- Production serves static files from dist/public

### Data Storage

**Primary Database**: Firebase Firestore
- Collection: "dishes"
- Schema enforced via Zod validation
- Timestamp handling for created dates (Firestore Timestamp converted to milliseconds)

**Database Schema** (defined in `shared/schema.ts`):
```typescript
{
  id: string,
  name: string,
  weight: string,
  price: string,
  category: string,
  description?: string,
  imageUrl: string,
  createdAt: number
}
```

**Schema Design Decision**: Uses Drizzle ORM configuration but currently implements Firebase instead. The system is architected to potentially migrate to PostgreSQL (Neon) using Drizzle, as evidenced by:
- `drizzle.config.ts` configured for PostgreSQL
- Schema defined using Drizzle-compatible structure
- DATABASE_URL environment variable requirement

This suggests a planned or future migration path from Firebase to a relational database.

### External Dependencies

**Image Hosting**: Cloudinary
- Configuration: Cloud name, API key, and API secret via environment variables
- Upload strategy: Convert buffer to base64 data URI, upload to "restaurant_dishes" folder
- Returns secure_url for storage in database

**Firebase Services**:
- Firebase Firestore for document storage
- Configuration via environment variables (VITE_FIREBASE_* prefix)
- Helper functions abstract Firestore operations (getAllDishes, addDish, getDishById)

**Authentication**: None currently implemented
- User schema exists in storage layer but is unused
- In-memory storage implementation (MemStorage) suggests authentication may be planned

**Session Management**: Connect-pg-simple package included but not actively used

### Form Handling & Validation

**Client-side**: React Hook Form with Zod resolver for type-safe form validation

**Server-side**: Zod schema validation before database insertion, with specific error handling for missing images

**Image Upload Flow**:
1. Client selects image file with preview
2. Form submits as multipart/form-data
3. Server validates image presence
4. Buffer converted to base64 and uploaded to Cloudinary
5. Cloudinary URL stored with dish data in Firebase
6. Client cache invalidated to show new dish

### Development Tools

**Type Safety**: Shared schema definitions between client and server via `@shared` path alias

**Code Quality**: TypeScript strict mode with comprehensive compiler options

**Hot Reload**: Vite dev server with custom middleware integration

**Error Handling**: Runtime error overlay via Replit plugin in development