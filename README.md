# NGO Task (Fullstack)

Fullstack app with a **Next.js (App Router)** frontend and an **Express + MongoDB** backend.

## Tech stack

- **Client**: Next.js, React, TypeScript, Tailwind
- **Server**: Express (TypeScript), MongoDB (Mongoose), JWT auth

## Project structure

- `client/`: Next.js frontend (runs on `http://localhost:3000`)
- `server/`: Express API (runs on `http://localhost:3001`)

## Prerequisites

- Node.js (recommended: latest LTS)
- A MongoDB instance (local MongoDB or MongoDB Atlas)

## Environment variables

### Server (`server/.env`)

Create `server/.env` with:

- **DBURI**: MongoDB connection string
- **PORT**: API port (default `3001`)
- **JWT_SECRET**: secret used to sign JWTs
- **ADMIN_EMAIL**: seeded admin email (optional)
- **ADMIN_PASSWORD**: seeded admin password (optional)

Note: on successful DB connection, the server runs `ensureAdminUser()` to create the admin user if it doesn’t already exist (`server/src/config/seedAdmin.ts`).

### Client (`client/.env`)

Create `client/.env` with:

- **NEXT_PUBLIC_API_BASE_URL**: backend base URL (example: `http://localhost:3001`)

## Run locally (development)

### 1) Start the backend

```bash
cd server
npm install
npm run dev
```

Server will log something like `Server is running on http://localhost:3001`.

### 2) Start the frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

## API overview

Base path: `http://localhost:3001/api`

- **Auth**: `POST /auth/register`, `POST /auth/login`, `GET /auth/profile` (protected)
- **Contact**: mounted at `POST /contact` (see `server/src/routes/ContactRoute.ts`)
- **Users**: mounted at `/users` (see `server/src/routes/UserRoute.ts`)

## Production build (optional)

The server compiles TypeScript to the repo-level `dist/` folder (see `server/tsconfig.json` `"outDir": "../dist"`).

```bash
cd server
npx tsc -p tsconfig.json
node ../dist/src/server.js
```

For the client, use:

```bash
cd client
npm run build
npm run start
```