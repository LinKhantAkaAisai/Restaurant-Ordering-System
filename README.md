# Restaurant-Ordering-System

A modern, full-stack application designed to streamline the restaurant ordering process, manage menus, and handle customer requests efficiently.

## 🚀 Features
* **Interactive Menu:** Browse dishes by category with real-time updates.
* **Cart & Order Management:** Add items, customize quantities, and view order summaries.
* **Smooth Navigation:** Clean user interface designed for both customers and staff.

---

## 📂 Project Structure

```text
restaurant-ordering-system/
│
├── frontend/                  # React Client (Vite)
│   ├── public/                # Static files (logos, QR placeholders)
│   ├── src/
│   │   ├── assets/            # Images, restaurant branding, CSS variables
│   │   ├── components/        # Reusable UI elements (Buttons, Input, FoodCard, Navbar)
│   │   ├── pages/             # Distinct application views
│   │   │   ├── MenuPage.jsx   # What the client sees after scanning the QR (Table specific)
│   │   │   ├── CartPage.jsx   # Review order before submitting
│   │   │   └── CounterDashboard.jsx # The restaurant's live order tracker
│   │   ├── hooks/             # Custom hooks (e.g., useCart, useSocket)
│   │   ├── context/           # Global state (OrderContext, AuthContext for counter staff)
│   │   ├── services/          # API calls (api.js, socket.js for real-time updates)
│   │   ├── utils/             # Helper functions (currency formatters, QR code parsers)
│   │   ├── App.jsx            # Routing and core layout
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind or standard CSS styling
│   ├── .env                   # Frontend environment variables (VITE_API_URL)
│   └── vite.config.js
│
├── backend/                   # Node.js + Express Server
│   ├── src/
│   │   ├── config/            # Database connection profiles (db.js, pool config)
│   │   ├── controllers/       # Business logic handlers
│   │   │   ├── menuController.js   # Fetching items, updating availability
│   │   │   └── orderController.js  # Creating orders, updating order status (Pending -> Cooking -> Served)
│   │   ├── models/            # SQL query blueprints
│   │   │   ├── Menu.js
│   │   │   └── Order.js
│   │   ├── routes/            # Express endpoints
│   │   │   ├── menuRoutes.js  # GET /api/menu
│   │   │   └── orderRoutes.js # POST /api/orders, PUT /api/orders/:id
│   │   ├── middleware/        # Auth for counter staff, error handling
│   │   ├── services/          # Socket.io setup for instant kitchen alerts
│   │   ├── utils/             # ID generators, notification helpers
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Entry point (listens on PORT)
│   └── .env                   # DB credentials, JWT secrets, Ports
│
├── database/                  # SQL Schema definitions
│   └── schema.sql             # Table structures (Tables, Menu items, Orders)
│
├── .gitignore
├── package.json
└── README.md
