# Replit Project Documentation

## Overview

This is a full-stack web application showcasing an AI-generated song called "Kevin's Flight." The application is built with a modern tech stack featuring a React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM. The project demonstrates a complete song presentation platform with audio playback, lyrics display, and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Fonts**: Inter and Crimson Text from Google Fonts

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod for runtime type validation
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

### Development Architecture
- **Build System**: ESBuild for server bundling, Vite for client
- **Type Checking**: TypeScript with strict configuration
- **Development Tools**: tsx for TypeScript execution, Replit integration plugins

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **Users Table**: Basic user authentication (id, username, password)
- **Songs Table**: Complete song metadata (title, artist, style, duration, audioUrl, lyrics, description)
- **Validation Schemas**: Zod schemas for type-safe data validation

### API Layer
RESTful API endpoints in `server/routes.ts`:
- `GET /api/songs` - Retrieve all songs
- `GET /api/songs/:id` - Get specific song by ID
- `POST /api/songs` - Create new song with validation

### Storage Layer
Abstracted storage interface in `server/storage.ts`:
- In-memory implementation for development (MemStorage)
- Interface design allows easy swapping to database implementation
- Pre-loaded with "Kevin's Flight" song data

### Frontend Components
- **AudioPlayer**: Custom audio player with play/pause, progress, and volume controls
- **LyricsDisplay**: Structured lyrics rendering with verse/chorus formatting
- **UI Components**: Complete shadcn/ui component library for consistent design

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data
2. **API Processing**: Express routes handle requests with validation
3. **Data Access**: Storage layer abstracts data retrieval/persistence
4. **Response**: JSON responses with error handling and logging
5. **UI Update**: TanStack Query manages caching and UI synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool
- **tsx**: TypeScript execution
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)
- **REPL_ID**: Replit-specific identifier for development features

### Production Considerations
- Static file serving handled by Express in production
- Development uses Vite middleware for hot reloading
- Database migrations run via `npm run db:push`
- Error handling with structured logging and response formatting

### Replit Integration
- Custom error overlay for development
- Cartographer plugin for enhanced debugging
- Development banner for external access
- Runtime error modal for better developer experience