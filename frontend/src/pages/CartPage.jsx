import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useCart } from '../hooks/useCart.js'
import { useOrders } from '../context/OrderContext.jsx'
import { submitOrder } from '../services/api.js'
import { formatCurrency, getTableFromQuery } from '../utils/helpers.js'
import './CartPage.css'

export default function CartPage() {
  const { items, addItem, decrementItem, removeItem, setNote, totalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const navigate = useNavigate()
  const tableNumber = getTableFromQuery()
  const [submitting, setSubmitting] = useState(false)
  const [confirmedId, setConfirmedId] = useState(null)

  async function handleSubmit() {
    if (items.length === 0) return
    setSubmitting(true)
    const order = {
      table: tableNumber,
      items: items.map((i) => ({ name: i.name, qty: i.qty, note: i.note, price: i.price })),
    }
    const result = await submitOrder(order)
    setSubmitting(false)
    setConfirmedId(result.id)
    addOrder({ ...result, status: result.status || 'pending', createdAt: result.createdAt || new Date().toISOString() })
    clearCart()
  }

  if (confirmedId) {
    return (
      <div className="cart-page">
        <Navbar tableNumber={tableNumber} />
        <div className="container confirm">
          <span className="chip confirm__chip">Sent to kitchen</span>
          <h1 className="confirm__title">Order {confirmedId} is on its way</h1>
          <p className="confirm__sub">We'll have it out to table {tableNumber} shortly. Thanks for ordering!</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" onClick={() => navigate(`/order/${confirmedId}`)}>
              Track order
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>
              Order more
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <Navbar tableNumber={tableNumber} />

      <div className="container cart-page__head">
        <h1>Your order</h1>
        <span className="chip">Table {tableNumber}</span>
      </div>

      {items.length === 0 ? (
        <div className="container cart-empty">
          <p>Your order is empty.</p>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>Browse the menu</button>
        </div>
      ) : (
        <>
          <div className="container cart-list">
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="cart-row__main">
                  <div className="cart-row__top">
                    <span className="cart-row__name">{item.name}</span>
                    <span className="cart-row__price">{formatCurrency(item.price * item.qty)}</span>
                  </div>
                  <input
                    className="cart-row__note"
                    placeholder="Add a note (e.g. no onions)"
                    value={item.note}
                    onChange={(e) => setNote(item.id, e.target.value)}
                  />
                </div>
                <div className="cart-row__controls">
                  <div className="cart-row__stepper">
                    <button onClick={() => decrementItem(item.id)} aria-label={`Remove one ${item.name}`}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => addItem(item)} aria-label={`Add one more ${item.name}`}>+</button>
                  </div>
                  <button className="cart-row__remove" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="container cart-summary">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <p className="cart-summary__note">Tax and service charge added at the counter.</p>
            <button className="btn btn-primary cart-summary__submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Sending…' : 'Send order to kitchen'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
