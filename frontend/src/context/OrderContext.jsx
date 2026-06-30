import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { fetchOrders, updateOrderStatus as apiUpdateStatus } from '../services/api'
import { connectSocket, getSocket, disconnectSocket } from '../services/socket'

const OrderContext = createContext(null)

const SEED_ORDERS = [
  {
    id: 'T-4821', table: '3', status: 'cooking', createdAt: new Date(Date.now() - 6 * 60000).toISOString(),
    items: [{ name: 'Smoked Beef Brisket Bowl', qty: 2, note: 'No pickles' }, { name: 'House Lemonade', qty: 2, note: '' }],
  },
  {
    id: 'T-4822', table: '7', status: 'pending', createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
    items: [{ name: 'Crispy Cauliflower Bites', qty: 1, note: '' }, { name: 'Grilled Salmon Teriyaki', qty: 1, note: 'Sauce on the side' }],
  },
  {
    id: 'T-4815', table: '1', status: 'served', createdAt: new Date(Date.now() - 24 * 60000).toISOString(),
    items: [{ name: 'Garden Herb Pasta', qty: 1, note: '' }],
  },
]

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(SEED_ORDERS)
  const [connected, setConnected] = useState(false)

  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const updateStatus = useCallback(async (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
    await apiUpdateStatus(orderId, status)
  }, [])

  useEffect(() => {
    let mounted = true

    fetchOrders().then((data) => {
      if (mounted && data) setOrders(data)
    })

    const socket = connectSocket()
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('order:new', (order) => addOrder(order))
    socket.on('order:update', ({ id, status }) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    })

    return () => {
      mounted = false
      disconnectSocket()
    }
  }, [addOrder])

  const value = { orders, addOrder, updateStatus, connected }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
