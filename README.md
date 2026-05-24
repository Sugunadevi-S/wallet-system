# Wallet & Transaction Management System

The Wallet Application is a full-stack web application built using the MERN stack (PostgreSQL, Express.js, React.js, Node.js). This application allows users to add money to their wallet, send money, and manage wallet transactions easily.

It provides a simple and user-friendly interface for managing financial transactions and tracking wallet activities.

---

# Technologies Used

## Frontend

- React.js
- Redux Toolkit
- Axios

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

# Features

- User Register
- User Login
- User Logout
- Dashboard
- Add Money
- Transfer Money
- Transaction History
- JWT Authentication
- Swagger API Documentation

---

# Installation and Setup

## Step 1: Clone Repository

```bash
git clone <https://github.com/Sugunadevi-S/wallet-system>
```

---

## Step 2: Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
npm start
```

Install backend dependencies:

```bash
cd server
npm install
npm run dev
```

---

## Step 3: Configure Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000

DB_USER=your_DB_username
DB_HOST=your_DB_host
DB_NAME=your_DB_name
DB_PASSWORD=your_DB_password
DB_PORT=your_DB_port

JWT_SECRET=your_jwt_secret
```

---

# Application URLs

## Frontend

```bash
http://localhost:3000
```

## Backend

```bash
http://localhost:5000
```

# Database Schema

### 🗄️ Entity Relationship Diagram

```
┌─────────────────────────────────┐
│           USERS                 │
├─────────────────────────────────┤
│ id (PK)         ← SERIAL        │
│ name            ← VARCHAR(100)  │
│ email (UNIQUE)  ← VARCHAR(100)  │
│ password        ← VARCHAR(255)  │
│ balance         ← NUMERIC(10,2) │
│ created_at      ← TIMESTAMP     │
└─────────────────────────────────┘
        ▲             ▲
        │             │
    (1:N)         (1:N)
  sender_id   receiver_id
        │             │
        └─────┬───────┘
              │
┌─────────────────────────────────┐
│        TRANSACTIONS             │
├─────────────────────────────────┤
│ id (PK)         ← SERIAL        │
│ sender_id (FK)  ← INTEGER       │
│ receiver_id(FK) ← INTEGER       │
│ type            ← VARCHAR(50)   │
│ amount          ← NUMERIC(10,2) │
│ status          ← VARCHAR(20)   │
│ created_at      ← TIMESTAMP     │
└─────────────────────────────────┘
```

---

## 👥 Users Table

Stores user account information and wallet balance.

### SQL Definition

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

---

## 💰 Transactions Table

Records all financial transactions (money additions and transfers).

### SQL Definition

```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    status VARCHAR(20) DEFAULT 'SUCCESS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

---

---

# API Documentation

Swagger API documentation is available at:

```bash
http://localhost:5000/api-docs
```

---

## 🎥 Project Demo

[Download Demo Video](./demo/wallet-system-demo.mp4)

---
