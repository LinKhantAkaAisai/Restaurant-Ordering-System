import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { id, name, price, qty, note }

  function addItem(menuItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id)
      if (existing) {
        return prev.map((i) => (i.id === menuItem.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: menuItem.id, name: menuItem.name, price: menuItem.price, qty: 1, note: '' }]
    })
  }

  function decrementItem(id) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function setNote(id, note) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, note } : i)))
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items])

  const value = { items, addItem, decrementItem, removeItem, setNote, clearCart, totalItems, totalPrice }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
