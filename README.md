# 🛠️ ToolHive

**ToolHive** is a peer-to-peer tool-rental marketplace that lets neighbors list, discover, and rent tools and equipment from one another instead of buying something they'll only use once or twice.

The project is split across two repositories:

| Repo | Description |
|---|---|
| [`tool-hive`](https://github.com/GrRabby/tool-hive) | Next.js frontend (the web app) |
| [`tool-hive-server`](https://github.com/GrRabby/tool-hive-server) | Express + MongoDB API (auth, listings, admin) |

🔗 **Live demo:** [tool-hive-rho.vercel.app](https://tool-hive-rho.vercel.app)

---

## ✨ Features

- **Browse & search** — filter tools by category, price range, and keyword, with sorting by price, rating, or newest
- **Tool details** — full descriptions, condition, daily rate, location, owner info, and related listings
- **List your own tools** — add items with title, description, category, condition, daily rate, location, and image
- **Manage listings** — view and delete tools you've listed
- **Authentication** — email/password sign up & login (session + JWT based)
- **Admin dashboard** — site-wide stats, category breakdowns, and the ability to manage every listing
- **Responsive, animated UI** — hero section, animated stats counters, scroll reveals, and testimonials

## 🗂️ Tool Categories

`power-tools` · `garden` · `camping` · `party-events` · `electronics` · `other`

## 📦 Tech Stack

### Frontend — `tool-hive`

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| Auth | [better-auth](https://www.better-auth.com/) (React client) |
| Forms | React Hook Form + `@hookform/resolvers` |
| Charts | Recharts (admin stats) |
| Animation | Framer Motion |
| Icons / Toasts | lucide-react / Sonner |
| Language | TypeScript |

### Backend — `tool-hive-server`

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express 5 |
| Language | TypeScript (via `tsx` / `tsc`) |
| Database | MongoDB with Mongoose (+ native driver for auth) |
| Auth | better-auth (`mongodbAdapter`, `admin`, `bearer`, `jwt` plugins) |
| Security | bcryptjs, JSON Web Tokens, CORS |
| Dev tooling | nodemon |

## 📁 Project Structure

### `tool-hive` (frontend)

```
src/
├── app/
│   ├── page.tsx              # Landing page (hero, featured tools, stats)
│   ├── tools/                # Browse tools + tool detail pages
│   ├── items/
│   │   ├── add/               # Create a listing
│   │   └── manage/             # Manage your own listings
│   ├── admin/                 # Admin dashboard & tool management
│   ├── login/ · register/     # Auth pages
│   └── about/ · contact/ · privacy/ · terms/
├── components/                # Navbar, Footer, ToolCard, FilterBar, etc.
├── lib/
│   ├── api.ts                  # Typed fetch client for the API
│   └── auth-client.ts          # better-auth client setup
└── types/                     # Shared TypeScript types (Tool, Owner, stats, ...)
```

### `tool-hive-server` (backend)

```
src/
├── index.ts                  # App entry — Express setup, CORS, routes, error handling
├── config/
│   └── db.ts                  # MongoDB connection (Mongoose + native client for auth)
├── lib/
│   └── auth.ts                 # better-auth configuration
├── middleware/
│   ├── auth.ts                  # `protect` — verifies the requester's session/token
│   └── isAdmin.ts                # `isAdmin` — restricts routes to admin users
├── controllers/
│   └── toolController.ts       # Tool CRUD, search/filter/sort, stats, admin queries
├── routes/
│   ├── toolRoutes.ts            # /api/tools
│   └── adminRoutes.ts            # /api/admin
├── models/
│   └── Tool.ts                  # Mongoose schema for a Tool listing
└── utils/
    └── getUsers.ts                # Helpers to resolve owner info for listings
```

## 🔌 API Overview

Auth routes are mounted at `/api/auth/*` and handled entirely by better-auth.

### Tools — `/api/tools`

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/featured` | Top-rated tools for the homepage | Public |
| GET | `/stats` | Site-wide public stats | Public |
| GET | `/mine` | Tools listed by the current user | Required |
| GET | `/` | List tools (`search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`) | Public |
| GET | `/:id` | Tool details, owner, and related tools | Public |
| POST | `/` | Create a tool listing | Required |
| DELETE | `/:id` | Delete a listing (owner or admin only) | Required |

### Admin — `/api/admin`

| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/tools` | All listings, with owner info attached | Admin |
| GET | `/stats` | Total tools + counts per category | Admin |

## 🚀 Getting Started

Both services need to run together — the frontend proxies all data and auth calls to the API.

### Prerequisites

- Node.js 18+
- A MongoDB database (local or Atlas)

### 1. Backend — `tool-hive-server`

```bash
git clone https://github.com/GrRabby/tool-hive-server.git
cd tool-hive-server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:5000
```

Run it:

```bash
npm run dev
```

The API is now available at `http://localhost:5000`.

### 2. Frontend — `tool-hive`

```bash
git clone https://github.com/GrRabby/tool-hive.git
cd tool-hive
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run it:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Repo | Command | Description |
|---|---|---|
| `tool-hive` | `npm run dev` | Start the dev server |
| `tool-hive` | `npm run build` | Build for production |
| `tool-hive` | `npm run start` | Start the production server |
| `tool-hive` | `npm run lint` | Run ESLint |
| `tool-hive-server` | `npm run dev` | Start the dev server with hot reload (nodemon + tsx) |
| `tool-hive-server` | `npm run build` | Compile TypeScript to `dist/` |
| `tool-hive-server` | `npm run start` | Run the compiled production build |

## 📄 License

No license specified yet (backend `package.json` lists ISC).

---

## 👤 Author

<div align="center">

**Gulam Robbani Rappy** (Rabby)

🌍 *Full-stack developer based in Sylhet, Bangladesh*

[![GitHub](https://img.shields.io/badge/GitHub-GrRabby-181717?style=for-the-badge&logo=github)](https://github.com/GrRabby)
[![Email](https://img.shields.io/badge/Email-grrabby9%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:grrabby9@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gulam%20Robbani-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gulam-robbani/)

</div>

---
