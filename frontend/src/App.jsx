import { Routes, Route, Navigate } from 'react-router-dom'
import MenuPage from './pages/MenuPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrderStatusPage from './pages/OrderStatusPage.jsx'
import CounterDashboard from './pages/CounterDashboard.jsx'
import StaffLogin from './pages/StaffLogin.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useAuth } from './context/AuthContext.jsx'

function RequireStaff({ children }) {
  const { staff } = useAuth()
  if (!staff) return <Navigate to="/staff/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Customer-facing */}
      <Route path="/" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order/:orderId" element={<OrderStatusPage />} />

      {/* Staff-facing */}
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route
        path="/counter"
        element={
          <RequireStaff>
            <CounterDashboard />
          </RequireStaff>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
