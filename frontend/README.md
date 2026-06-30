# Frontend — Restaurant Ordering System

React + Vite client for the ordering system. Plain CSS with a token system in `src/index.css` (no Tailwind), built around two surfaces:

- **Customer side** (`MenuPage`, `CartPage`, `OrderStatusPage`): warm paper background, editorial serif headings.
- **Staff side** (`StaffLogin`, `CounterDashboard`): dark "kitchen screen" with order tickets styled like torn thermal receipts.

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | `MenuPage` | Customer browses the menu by category and builds an order. Visit with `?table=4` to simulate a QR scan. |
| `/cart` | `CartPage` | Review items, add notes, submit to the kitchen. |
| `/order/:orderId` | `OrderStatusPage` | Customer tracks their order's status after submitting. |
| `/staff/login` | `StaffLogin` | PIN gate for counter staff (demo PIN: `1234`). |
| `/counter` | `CounterDashboard` | Live queue of incoming orders, grouped/filterable by status, with a button to advance each ticket. |

## Running locally

```bash
npm install
npm run dev
```

The app works standalone with mock menu/order data (see `src/services/api.js`) and falls back gracefully if `backend/` isn't running yet. Point `VITE_API_URL` and `VITE_SOCKET_URL` in `.env` at your Express server once it's ready, and real-time order pushes will flow through `src/services/socket.js`.

## Structure

```
src/
├── components/   # Navbar, FoodCard, OrderTicket, Button, Input
├── pages/        # MenuPage, CartPage, OrderStatusPage, StaffLogin, CounterDashboard, NotFoundPage
├── context/       # CartContext, OrderContext, AuthContext
├── hooks/         # useCart, useSocket
├── services/      # api.js, socket.js
└── utils/         # helpers.js (currency, table parsing, status labels)
```
