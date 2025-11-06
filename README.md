# Simple E-commerce App (Frontend + Backend)

## Overview
This repository contains a minimal but complete e-commerce starter:
- **backend/**: Node.js + Express + Mongoose (MongoDB). Auth with JWT.
- **frontend/**: React app (plain Create-React-App-like structure) using fetch to call backend.

**Features implemented**
- Users: Signup / Login, role (user/admin).
- Products: Product model. Admin CRUD; users can view.
- Cart: Add/remove items to cart (stored in user document).
- Orders: Checkout saves order in DB.
- Simple admin page in frontend to add products.

## Quick start (local)

### Backend
1. Install Node.js (v16+).
2. `cd backend`
3. `npm install`
4. Create a `.env` file (example in `.env.example`)
5. `npm run dev` (uses nodemon)

Backend will run on port 5000 by default.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

Frontend will run on port 3000 by default.

## Connect to GitHub
- Initialize git: `git init`
- Add remote: `git remote add origin <your-repo-url>`
- Commit & push.

