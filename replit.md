# ModernStyle E-commerce Platform

## Overview

ModernStyle is a modern e-commerce clothing platform built with React, TypeScript, and Express. The application features a sophisticated shopping experience with product catalog management, shopping cart functionality, and a premium UI design system. The platform is designed for selling contemporary clothing with features like category browsing, product filtering, wishlist management, and responsive design optimized for both mobile and desktop experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and local React state for UI interactions
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens for colors, spacing, and typography
- **Theme System**: Built-in light/dark mode support with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **API Design**: RESTful endpoints with proper error handling and request/response logging
- **Development Setup**: Vite for fast development builds and hot module replacement

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for database operations
- **Schema Design**: Relational model with categories, subcategories, products, orders, and order items
- **Database Provider**: Neon serverless PostgreSQL with connection pooling
- **Migrations**: Drizzle Kit for schema migrations and database management

### UI Design System
- **Component Library**: Custom components built on Radix UI primitives
- **Design Tokens**: Centralized color system with CSS variables for theming
- **Layout System**: Responsive grid layouts with Tailwind's spacing primitives
- **Typography**: Inter/Poppins font stack with systematic sizing and weights
- **Interactive States**: Hover effects, loading states, and micro-interactions for enhanced UX

### Product Catalog Architecture
- **Hierarchical Categories**: Two-level category system (categories → subcategories)
- **Product Variants**: Support for multiple sizes, colors, and images per product
- **Inventory Management**: Stock tracking and availability status
- **Pricing System**: Regular and sale pricing with promotional badges
- **Search & Filtering**: Category-based filtering with sorting options

### Shopping Experience
- **Cart Management**: Persistent shopping cart with quantity updates and item removal
- **Product Discovery**: Grid-based product browsing with pagination and quick view modals
- **Wishlist System**: User favorites with persistent storage
- **Responsive Design**: Mobile-first approach with desktop enhancements

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router for navigation
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database connection

### UI and Styling
- **@radix-ui/***: Accessible UI primitive components (dialogs, dropdowns, navigation, etc.)
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Component variant management system
- **clsx**: Conditional CSS class utility

### Payment Processing
- **@stripe/stripe-js**: Stripe payment integration for checkout processing
- **@stripe/react-stripe-js**: React components for Stripe payment forms

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking and enhanced developer experience
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development workflows

### Form Handling
- **react-hook-form**: Performance-focused form library with validation
- **@hookform/resolvers**: Form validation resolvers for schema validation
- **zod**: Runtime type validation and schema definition (via Drizzle schemas)

### Date and Utility Libraries
- **date-fns**: Modern date utility library for formatting and manipulation
- **nanoid**: URL-safe unique ID generation
- **cmdk**: Command palette and search interface component