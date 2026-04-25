# 📦 Inventory Management System — Backend API

A production-grade Inventory Management System backend built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. Features JWT authentication, role-based access control, and a full inventory lifecycle engine.

---

## 🚀 Features

### 🔐 Authentication

- User registration & login
- JWT access & refresh token system
- Secure password hashing with bcrypt

### 👥 Role System

| Role    | Access                               |
| ------- | ------------------------------------ |
| `ADMIN` | Full access to all modules           |
| `STAFF` | Limited to stock IN / OUT operations |

### 📦 Core Modules

- Category management
- Supplier management
- Product management
- Inventory stock IN / OUT system
- Transaction history with filters
- Audit logging for every stock change

### 📊 Business Logic

- Auto stock update on IN / OUT
- Prevent negative stock (stock safety validation)
- Low stock detection
- Full transaction history tracking
- Prisma `$transaction` for atomic operations

---

## 🧱 Tech Stack

| Layer            | Technology                    |
| ---------------- | ----------------------------- |
| Runtime          | Node.js                       |
| Framework        | Express.js                    |
| Language         | TypeScript                    |
| ORM              | Prisma                        |
| Database         | PostgreSQL                    |
| Validation       | Zod                           |
| Authentication   | JWT (access + refresh tokens) |
| Password Hashing | bcrypt                        |

---

## 📁 Project Structure

```
src/
│
├── config/
│   ├── db.ts                    # Prisma client instance
│   └── env.ts                   # Environment variables loader
│
├── middleware/
│   ├── auth.middleware.ts        # JWT verification
│   ├── role.middleware.ts        # ADMIN / STAFF access control
│   └── error.middleware.ts       # Global error handler
│
├── utils/
│   ├── AppError.ts              # Custom error class
│   └── asyncHandler.ts          # Wrapper for async controllers
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.validation.ts
│   │
│   ├── category/
│   │   ├── category.controller.ts
│   │   ├── category.service.ts
│   │   ├── category.routes.ts
│   │   └── category.validation.ts
│   │
│   ├── supplier/
│   │   ├── supplier.controller.ts
│   │   ├── supplier.service.ts
│   │   ├── supplier.routes.ts
│   │   └── supplier.validation.ts
│   │
│   ├── product/
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   ├── product.routes.ts
│   │   └── product.validation.ts
│   │
│   ├── inventory/
│   │   ├── inventory.controller.ts
│   │   ├── inventory.service.ts
│   │   ├── inventory.routes.ts
│   │   └── inventory.validation.ts
│   │
│   ├── transaction/
│   │   ├── transaction.controller.ts
│   │   ├── transaction.service.ts
│   │   └── transaction.routes.ts
│   │
│   └── audit/
│       └── audit.service.ts     # Centralized audit logging
│
├── routes/
│   └── index.ts                 # Combine all module routes
│
├── app.ts                       # Express app setup
└── server.ts                    # Server entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/inventory-system.git
cd inventory-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

PORT=5000
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## 🔐 Authentication Flow

### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Rahul",
  "email": "rahul@test.com",
  "password": "123456"
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "rahul@test.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Protected Routes

Add this header to every protected request:

```http
Authorization: Bearer <accessToken>
```

---

## 📦 API Reference

### 📁 Category Module — `/api/v1/categories`

| Method   | Endpoint          | Access |
| -------- | ----------------- | ------ |
| `POST`   | `/categories`     | ADMIN  |
| `GET`    | `/categories`     | ALL    |
| `GET`    | `/categories/:id` | ALL    |
| `PUT`    | `/categories/:id` | ADMIN  |
| `DELETE` | `/categories/:id` | ADMIN  |

**Create Category:**

```json
{ "name": "Electronics" }
```

---

### 🚚 Supplier Module — `/api/v1/suppliers`

| Method   | Endpoint         | Access |
| -------- | ---------------- | ------ |
| `POST`   | `/suppliers`     | ADMIN  |
| `GET`    | `/suppliers`     | ALL    |
| `GET`    | `/suppliers/:id` | ALL    |
| `PUT`    | `/suppliers/:id` | ADMIN  |
| `DELETE` | `/suppliers/:id` | ADMIN  |

**Create Supplier:**

```json
{
  "name": "ABC Traders",
  "phone": "9876543210",
  "address": "Ranchi"
}
```

---

### 📦 Product Module — `/api/v1/products`

| Method   | Endpoint              | Access |
| -------- | --------------------- | ------ |
| `POST`   | `/products`           | ADMIN  |
| `GET`    | `/products`           | ALL    |
| `GET`    | `/products/:id`       | ALL    |
| `GET`    | `/products/low-stock` | ADMIN  |
| `PUT`    | `/products/:id`       | ADMIN  |
| `DELETE` | `/products/:id`       | ADMIN  |

**Create Product:**

```json
{
  "name": "Rice",
  "sku": "RICE001",
  "quantity": 1000,
  "pricePerKg": 60,
  "categoryId": "category-uuid",
  "supplierId": "supplier-uuid"
}
```

---

### 📊 Inventory Module — `/api/v1/inventory` 🔥

| Method | Endpoint         | Access        |
| ------ | ---------------- | ------------- |
| `POST` | `/inventory/in`  | ADMIN / STAFF |
| `POST` | `/inventory/out` | ADMIN / STAFF |

**Stock IN:**

```json
{
  "productId": "uuid",
  "quantity": 500,
  "note": "Purchased stock"
}
```

**Stock OUT:**

```json
{
  "productId": "uuid",
  "quantity": 200,
  "note": "Sold items"
}
```

---

### 📜 Transaction Module — `/api/v1/transactions`

| Method | Endpoint                                           | Access |
| ------ | -------------------------------------------------- | ------ |
| `GET`  | `/transactions?page=1&limit=10`                    | ADMIN  |
| `GET`  | `/transactions/product/:productId`                 | ADMIN  |
| `GET`  | `/transactions/type/IN`                            | ADMIN  |
| `GET`  | `/transactions/type/OUT`                           | ADMIN  |
| `GET`  | `/transactions/date?from=2026-01-01&to=2026-12-31` | ADMIN  |

---

### 🧪 Audit Log Module — `/api/v1/audit-logs`

| Method | Endpoint      | Access     |
| ------ | ------------- | ---------- |
| `GET`  | `/audit-logs` | ADMIN ONLY |

---

## 🧠 Business Logic

### ✅ Stock IN

1. Validate product exists
2. Increase product quantity
3. Create `InventoryTransaction` record (type: `IN`)
4. Write audit log entry

### ✅ Stock OUT

1. Validate product exists
2. Check sufficient quantity (prevent negative stock)
3. Decrease product quantity
4. Create `InventoryTransaction` record (type: `OUT`)
5. Write audit log entry

> All steps above run inside a Prisma `$transaction` block to ensure atomicity.

---

## 🗄️ Database Schema (Main Tables)

| Table                  | Description                        |
| ---------------------- | ---------------------------------- |
| `User`                 | Auth users with roles              |
| `Category`             | Product categories                 |
| `Supplier`             | Supplier information               |
| `Product`              | Product master with stock quantity |
| `InventoryTransaction` | All IN/OUT stock movements         |
| `AuditLog`             | Immutable audit trail              |

---

## 🏗️ Architecture Principles

### Separation of Concerns

| Layer      | Responsibility                            |
| ---------- | ----------------------------------------- |
| Controller | HTTP layer — parse request, send response |
| Service    | Business logic                            |
| Validation | Input safety via Zod schemas              |
| Middleware | Auth + role access control                |
| Utils      | Reusable helpers (AppError, asyncHandler) |

### Why This Structure Is Production-Ready

- **Feature-based modular design** — each module is self-contained, easy to scale, debug, and test independently
- **Prisma `$transaction`** — guarantees atomic stock + transaction + audit writes
- **Centralized error handling** — consistent API error responses
- **Extensible** — new modules (`reports/`, `warehouse/`, `notifications/`) can be added without touching existing code

---

## 🚀 Future Improvements

- [ ] Swagger / OpenAPI documentation
- [ ] Redis caching for product listings
- [ ] Email alerts for low stock threshold
- [ ] Dashboard analytics endpoints
- [ ] Unit & integration tests (Jest + Supertest)
- [ ] Docker & Docker Compose setup
- [ ] CI/CD pipeline

---

## 🧪 Testing Flow (Recommended Order)

```
1. Auth        →  Register → Login → Save token
2. Master Data →  Create Category → Create Supplier → Create Product
3. Inventory   →  Stock IN → Stock OUT
4. Reports     →  Transactions → Filters → Low Stock Check
```

Import the included **Postman Collection** (`InventoryManagement.postman_collection.json`) for a fully pre-configured test environment with auto token saving and variable management.

---

## 👨‍💻 Author

Built as a production-ready backend system demonstrating real-world inventory management with clean architecture, role-based security, and atomic business operations.
