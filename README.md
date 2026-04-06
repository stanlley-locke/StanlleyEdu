# StanlleyHub Education Platform

## Overview

StanlleyHub is a comprehensive education platform designed for a practical software engineering bootcamp based in Kenya. The platform integrates a public marketing site, a dedicated student portal, and an administrative dashboard to manage the end-to-end bootcamp experience.

## Repository Structure

This project is managed as a pnpm monorepo, separating concerns across multiple packages to ensure scalability and maintainability.

### Applications (artifacts/)

- **stanlleyhub**: The primary user interface built with React. It serves public visitors, students, and administrators.
- **api-server**: The Node.js backend providing RESTful services, authentication, and data management.
- **mockup-sandbox**: An isolated environment used for rapid UI prototyping and component testing.

### Libraries (lib/)

- **db**: The database abstraction layer using Drizzle ORM and PostgreSQL.
- **api-spec**: Centralized OpenAPI 3.0 specification defining the communication contract.
- **api-zod**: Shared Zod validation schemas derived from or used by the API specification.
- **api-client-react**: Type-safe React Query hooks generated automatically from the API spec.

### Utilities

- **scripts**: Build tools, type-checking configurations, and code generation utilities.

---

## Technology Stack

### Frontend
- **Core**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Routing**: Wouter
- **State Management**: Zustand
- **Animations**: Framer Motion

### Backend
- **Framework**: Express 5
- **Validation**: Zod
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM

---

## Getting Started

### Prerequisites
- Node.js 24 or higher
- pnpm 10 or higher

### Installation

This project requires pnpm. Using npm or yarn will trigger a pre-install failure.

```bash
pnpm install
```

### Development

To start the API server in development mode:
```bash
pnpm --filter @workspace/api-server run dev
```

To start the main frontend application:
```bash
pnpm --filter @workspace/stanlleyhub run dev
```

---

## Development Workflow

### API Updates
The project follows a contract-first approach. When changing the API:
1. Update the specification in `lib/api-spec`.
2. Generate updated hooks and schemas:
   ```bash
   pnpm --filter @workspace/api-spec run codegen
   ```

### Database Management
Schema changes are managed via Drizzle. To push local changes to the database:
```bash
pnpm --filter @workspace/db run push
```

### Full Typecheck
To verify type safety across the entire monorepo:
```bash
pnpm run typecheck
```

---

## Deployment and Migration

The platform is designed to be deployment-agnostic but includes a clear path for Supabase integration:
1. Update the `DATABASE_URL` to point to a Supabase instance.
2. Push the schema using the Drizzle push command.
3. Replace the local auth store with Supabase Auth or a JWT-based system.

## Contact

- **Instructor**: Stanlley Locke
- **Email**: stanlleylocke@gmail.com
- **WhatsApp**: +254 752 032 884
