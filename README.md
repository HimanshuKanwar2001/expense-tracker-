# Expense Tracker Fullstack Application

This is a fullstack Expense Tracker application with a React + Vite frontend and a Node.js + Express + PostgreSQL + Redis backend.

## Features

- User authentication (admin, user, read-only roles)
- Transaction management (add, edit, delete, view)
- Analytics dashboard (with caching via Redis)
- Admin user management
- Role-based access control

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- PostgreSQL database
- Redis server

---

## Backend Setup

1. **Navigate to the backend folder:**

   ```sh
   cd backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env-example` to `.env` and fill in your values.

4. **Set up the PostgreSQL database:**

   - Create a database and run the necessary SQL to create `users` and `transactions` tables.

5. **Start the backend server:**

   ```sh
   npm run dev
   ```

   The backend will run on [http://localhost:3000](http://localhost:3000).

---

## Frontend Setup

1. **Navigate to the frontend folder:**

   ```sh
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend development server:**

   ```sh
   npm run dev
   ```

   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register a new user or login.
- Explore the dashboard, add transactions, view analytics, and (if admin) manage users.

---

## Notes

- Ensure PostgreSQL and Redis are running before starting the backend.
- The frontend expects the backend API at `http://localhost:3000/api`.
- For production, update CORS, environment variables, and secure your secrets.

---

## License

MIT
