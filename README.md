# Product Inventory Server

Welcome! 👋

This is a simple, modern Node.js server for managing a product inventory. It was built as a home assignment, but with real-world best practices in mind. The API is clean, the code is TypeScript, and the database is MongoDB (via Mongoose). If you want to run, test, or extend it you're in the right place!

---

## 🚀 Tech Stack
- **Node.js** & **Express** – Fast, minimalist server
- **TypeScript** – Type safety for maintainable code
- **MongoDB** (Atlas or local) – Flexible NoSQL database
- **Mongoose** – Elegant MongoDB object modeling
- **Morgan** – HTTP request logger
- **dotenv** – Environment variable management

---

## 🛠️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/NoyLeibo/crud-app-server.git
   cd crud-app-server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env` and set your MongoDB USER-NAME and PASSWORD and any other secrets.
4. **Run the server (dev mode):**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` (or your chosen port).

---

## 📦 API Overview

All endpoints are prefixed with `/product`.

### Create Product
- **POST** `/product/`
- **Body:**
  ```json
  {
    "name": "Apple",
    "sku": 123,
    "description": "Fresh apple",
    "category": "Fruit",
    "marketingDate": "2024-01-01"
  }
  ```

### Get Products
- **GET** `/product/`
- **Query params (optional):** `category`, `name`

### Get Product by ID
- **GET** `/product/:id`

### Update Product
- **PUT** `/product/:id`
- **Body:** (fields to update)

### Delete Product(s)
- **DELETE** `/product/`
- **Body:**
  ```json
  { "ids": ["id1", "id2"] }
  ```
  Or for a single product:
  ```json
  { "ids": "id1" }
  ```

### Undo Delete
- **PUT** `/product/undo-delete`
- **Body:**
  ```json
  { "ids": ["id1", "id2"] }
  ```
  
---

## ❤️ Author
Made with care by a real human. If you have questions, feedback, or want to chat about code feel free to reach out!
