# 🌿 DXNANCHAL Product Guide — Deployment & Architecture Guide

Welcome to the **DXNANCHAL Botanical Wellness Product Guide**. This project is a modern full-stack web application converted faithfully from the original Stitch educational UI, featuring a high-performance **React + Vite** frontend, a scalable **Node.js / Express.js** REST API backend, and **MongoDB** database integration via Mongoose.

---

## 📋 Table of Contents
1. [Architecture & Tech Stack](#-architecture--tech-stack)
2. [Project Directory Layout](#-project-directory-layout)
3. [Environment Configuration (.env)](#-environment-configuration-env)
4. [Local Development Setup](#-local-development-setup)
5. [Database Setup (MongoDB Atlas & Local)](#-database-setup-mongodb-atlas--local)
6. [Frontend Deployment (Vercel, Netlify)](#-frontend-deployment-vercel-netlify)
7. [Backend Deployment (Render, Railway, Heroku)](#-backend-deployment-render-railway-heroku)
8. [Unified Full-Stack Deployment](#-unified-full-stack-deployment)
9. [API Endpoints Reference](#-api-endpoints-reference)
10. [Production Checklist](#-production-checklist)

---

## 🏛️ Architecture & Tech Stack

```
   ┌─────────────────────────────────────────────────────────┐
   │               CLIENT: React (Vite) + Tailwind           │
   │  - Design System: Editorial Botanical (Theme from Stitch)│
   │  - Multilingual: English & Hindi (हिन्दी)               │
   │  - Interactive Comparison Matrix (3-slot state)         │
   │  - Search & Category Filter Hub                         │
   └──────────────────────────┬──────────────────────────────┘
                              │ REST API Calls (/api/*)
                              ▼
   ┌─────────────────────────────────────────────────────────┐
   │             BACKEND: Node.js + Express.js API           │
   │  - CORS & Morgan Request Logging                        │
   │  - Product & Ingredient Catalog Controllers             │
   │  - Direct Inquiries Processor (POST /api/inquiries)     │
   │  - Dual-mode: MongoDB Mongoose + In-Memory Fallback     │
   └──────────────────────────┬──────────────────────────────┘
                              │
                              ▼
   ┌─────────────────────────────────────────────────────────┐
   │                  DATABASE: MongoDB                      │
   │  - Collection: products (8 curated DXN products)        │
   │  - Collection: ingredients (Botanical compendium)       │
   │  - Collection: inquiries (Contact submissions)          │
   └─────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite 6, Tailwind CSS 3.4 (with customized Stitch color palette & typography), React Router DOM 6.
- **Backend**: Node.js, Express.js 4, Mongoose 8, CORS, Morgan, Dotenv.
- **Database**: MongoDB (Atlas or local instance).

---

## 📂 Project Directory Layout

```
stitch_dxnanchal_product_guide/
├── .env                      # Active credentials file (includes MongoDB)
├── .env.example              # Template credentials file
├── .gitignore                # Git ignore rules
├── DEPLOYMENT_GUIDE.md       # Comprehensive deployment manual
├── package.json              # Root project orchestrator
├── frontend/                 # React Vite Client
│   ├── index.html            # Loads Manrope and Material Symbols Outlined
│   ├── vite.config.js        # Vite config with API proxy
│   ├── tailwind.config.js    # Exact color system from DESIGN.md
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # Client routes and layout wrapper
│       ├── index.css         # Tailwind base styles and safe area utilities
│       ├── context/
│       │   ├── LanguageContext.jsx # EN / HI bilingual engine
│       │   └── CompareContext.jsx  # 3-product comparison state
│       ├── components/
│       │   ├── Header.jsx          # Header with logo, subtitle, lang toggle
│       │   ├── Footer.jsx          # Footer with verified archive notes
│       │   ├── BottomNav.jsx       # Fixed mobile navigation bar
│       │   ├── ProductCard.jsx     # Card component with specs & compare toggle
│       │   ├── SearchModal.jsx     # Live instant search modal
│       │   ├── MenuDrawer.jsx      # Mobile navigation drawer
│       │   └── ContactModal.jsx    # "Direct Inquiries" submission dialog
│       ├── pages/
│       │   ├── Home.jsx            # Exact Stitch Home page
│       │   ├── Products.jsx        # Full product catalog with filters & sorting
│       │   ├── ProductDetail.jsx   # Botanical matrix (RG vs GL) and specs
│       │   ├── Compare.jsx         # Objective comparison matrix table
│       │   ├── Ingredients.jsx     # Botanical compendium & monographs
│       │   └── About.jsx           # Meet Anchal bio & research methodology
│       ├── data/
│       │   ├── productsData.js     # Curated 8 products dataset
│       │   ├── ingredientsData.js  # Botanical ingredients dataset
│       │   └── translations.js     # English & Hindi translation dictionary
│       └── services/
│           └── api.js              # Fetch client with automated fallback
└── backend/                  # Node/Express API Server
    ├── server.js             # Express application entrypoint
    ├── package.json
    ├── config/
    │   └── db.js             # Mongoose connection & status checker
    ├── models/
    │   ├── Product.js        # Product Mongoose schema
    │   ├── Ingredient.js     # Ingredient Mongoose schema
    │   └── Inquiry.js        # Contact inquiry Mongoose schema
    ├── controllers/
    │   ├── productController.js
    │   ├── ingredientController.js
    │   └── inquiryController.js
    ├── routes/
    │   ├── productRoutes.js
    │   ├── ingredientRoutes.js
    │   └── inquiryRoutes.js
    └── seed/
        └── seedData.js       # Seed runner for initial catalog import
```

---

## 🔐 Environment Configuration (.env)

The `.env` file at the root contains all runtime credentials. Ensure this file is never committed to public repositories (it is listed in `.gitignore`).

```ini
# Server Port & Mode
PORT=5000
NODE_ENV=development

# MongoDB Connection String (Atlas URI or local)
MONGODB_URI=mongodb+srv://admin_anchal:DxnAnchalSecure2025@cluster0.zvd8q.mongodb.net/dxnanchal?retryWrites=true&w=majority&appName=Cluster0

# Allowed origin for CORS
CLIENT_ORIGIN=http://localhost:5173

# Frontend API Base URL
VITE_API_BASE_URL=http://localhost:5000/api

# Security Keys
JWT_SECRET=dxnanchal_botanical_jwt_secret_key_998877665544332211
SESSION_SECRET=dxnanchal_session_encryption_seed_anchal_nutrition_2025
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
In the root directory, install the dependencies for both client and server:
```bash
# Install root tools (concurrently)
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Seed MongoDB Database (Optional)
If your MongoDB instance is running, populate the verified product and ingredient catalog:
```bash
npm run seed
# or
cd backend && node seed/seedData.js
```
> **Note**: Even without MongoDB running, the backend features an automatic built-in in-memory fallback store with all 8 products and botanical monographs, ensuring immediate local testing without database dependencies!

### 3. Run Development Servers
Start both backend and frontend concurrently:
```bash
npm run dev
```
- **Frontend** will be live at: `http://localhost:5173`
- **Backend API** will be live at: `http://localhost:5000/api`

Or run them in separate terminals:
- Terminal 1: `npm run dev:server` (or `cd backend && npm run dev`)
- Terminal 2: `npm run dev:client` (or `cd frontend && npm run dev`)

---

## 🗄️ Database Setup (MongoDB Atlas)

To configure your own cloud database on MongoDB Atlas:
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 Shared Cluster.
3. Under **Database Access**, create a database user (e.g., `dxn_admin`) and secure password.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere) or your specific host IP.
5. Click **Connect** → **Drivers** (Node.js) and copy the connection string.
6. Replace `<password>` with your database user password and update `MONGODB_URI` in `.env`:
   ```ini
   MONGODB_URI=mongodb+srv://dxn_admin:<password>@cluster0.xxxx.mongodb.net/dxnanchal?retryWrites=true&w=majority
   ```
7. Run `npm run seed` to insert the 8 curated products and botanical monographs.

---

## 🚀 Frontend Deployment (Vercel / Netlify)

### Option A: Deploying Frontend to Vercel
1. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Connect your Git repository.
3. Configure the build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api`
5. Click **Deploy**.

### Option B: Deploying Frontend to Netlify
1. Sign in to [Netlify](https://netlify.com) and click **Add new site** → **Import an existing project**.
2. Set **Base directory**: `frontend`
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `frontend/dist`
5. In **Environment variables**, set `VITE_API_BASE_URL` to your live API URL.
6. Under `frontend/public/_redirects`, ensure SPA routing is enabled:
   ```
   /*    /index.html   200
   ```

---

## ☁️ Backend Deployment (Render / Railway)

### Option A: Deploying Backend to Render.com
1. Sign in to [Render](https://render.com) and select **New Web Service**.
2. Connect your Git repository.
3. Set the configuration:
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Under **Environment Variables**, add:
   - `PORT`: `10000` (or leave default assigned by Render)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `CLIENT_ORIGIN`: Your deployed Vercel/Netlify frontend URL (e.g. `https://dxnanchal.vercel.app`)
5. Click **Deploy Web Service**.

### Option B: Deploying Backend to Railway.app
1. Create a project in [Railway.app](https://railway.app).
2. Connect your Git repo and select `backend` as the root directory.
3. Set variables `MONGODB_URI`, `NODE_ENV=production`, `CLIENT_ORIGIN=https://your-frontend.vercel.app`.
4. Railway will automatically detect Node.js and run `npm start`.

---

## 📦 Unified Full-Stack Single-Container Deployment

You can also deploy the entire full stack as a single service on Render, AWS, Heroku, or DigitalOcean:
1. Build the frontend:
   ```bash
   cd frontend && npm install && npm run build && cd ..
   ```
2. The Express server (`backend/server.js`) is pre-configured to detect and serve the production static files from `frontend/dist` automatically when `NODE_ENV=production`:
   ```javascript
   if (process.env.NODE_ENV === 'production') {
     const distPath = path.resolve(__dirname, '../frontend/dist');
     app.use(express.static(distPath));
     app.get('*', (req, res) => {
       res.sendFile(path.resolve(distPath, 'index.html'));
     });
   }
   ```
3. Set `NODE_ENV=production` on your host. Running `node backend/server.js` will serve both the API and the React SPA on a single port!

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and MongoDB connection state |
| `GET` | `/api/products` | Retrieve all 8 products (Query: `category`, `search`, `sort`) |
| `GET` | `/api/products/:slug` | Retrieve single product details and specs |
| `POST`| `/api/products` | Create / insert product (Admin) |
| `GET` | `/api/ingredients` | Retrieve botanical compendium (Query: `category`, `search`) |
| `GET` | `/api/ingredients/:slug` | Retrieve single botanical profile |
| `POST`| `/api/inquiries` | Submit direct inquiry / contact message |
| `GET` | `/api/inquiries` | Retrieve submitted inquiries (Admin) |

---

## ✅ Production Checklist

- [x] **UI Fidelity**: All components, fonts (Manrope), icons (Material Symbols Outlined), colors, and badges strictly match the Stitch design system.
- [x] **Bilingual Readiness**: English and Hindi (हिन्दी) translations toggle seamlessly with persistent local state.
- [x] **Comparison Engine**: 3-slot product comparison tray operates dynamically across all pages.
- [x] **Zero-Downtime Fallback**: Frontend and backend gracefully serve verified botanical data even during database reconnections.
- [x] **Environment Security**: All sensitive credentials placed in `.env` and excluded via `.gitignore`.
- [x] **Mobile Responsiveness**: Fixed header, horizontal scrolling chips, safe-area insets, and bottom navigation configured for all viewports.
