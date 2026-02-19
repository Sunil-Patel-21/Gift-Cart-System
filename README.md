# Gift Cart System - Separated Frontend Structure

## Project Structure

```
Gift-Cart-System/
├── backend/                    # Node.js + Express + MongoDB Backend
├── user-frontend/              # Angular User Frontend (Port 4200)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # User components (login, register, home, products, cart, checkout, orders, payment)
│   │   │   ├── services/       # User services (auth, gift, category, cart, order, payment)
│   │   │   ├── guards/         # Auth guard
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── admin-frontend/             # Angular Admin Frontend (Port 4201)
    ├── src/
    │   ├── app/
    │   │   ├── components/     # Admin components (login, dashboard, gifts, categories, orders)
    │   │   ├── services/       # Admin services (auth, gift, category, order)
    │   │   ├── guards/         # Auth guard
    │   │   ├── app.module.ts
    │   │   └── app-routing.module.ts
    │   ├── environments/
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/gift-cart
# JWT_SECRET=your_secret_key
# PORT=5000
npm start
```

### 2. User Frontend Setup
```bash
cd user-frontend
npm install
npm start
# Runs on http://localhost:4200
```

### 3. Admin Frontend Setup
```bash
cd admin-frontend
npm install
npm start
# Runs on http://localhost:4201
```

## Key Differences

### User Frontend (Port 4200)
- **Routes**: /home, /products, /cart, /checkout, /payment, /orders, /login, /register
- **Features**: 
  - Browse and search gifts
  - Add to cart
  - Place orders
  - Make payments
  - View order history
- **Storage**: Uses `localStorage` keys: `token`, `user`

### Admin Frontend (Port 4201)
- **Routes**: /login, /dashboard, /gifts, /categories, /orders
- **Features**:
  - Manage gifts (CRUD)
  - Manage categories (CRUD)
  - View and update order status
  - Admin-only access
- **Storage**: Uses `localStorage` keys: `admin_token`, `admin_user`

## API Endpoints
Both frontends connect to the same backend API at `http://localhost:5000/api`

## Default Admin Credentials
Create an admin user in MongoDB:
```javascript
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123", // Will be hashed
  "role": "admin"
}
```

## Running All Services
1. Start Backend: `cd backend && npm start`
2. Start User Frontend: `cd user-frontend && npm start`
3. Start Admin Frontend: `cd admin-frontend && npm start`

Access:
- User Portal: http://localhost:4200
- Admin Portal: http://localhost:4201
- Backend API: http://localhost:5000
