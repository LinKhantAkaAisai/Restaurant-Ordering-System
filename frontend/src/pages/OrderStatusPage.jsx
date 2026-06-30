import { useParams, useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrderContext.jsx'
import { STATUS_FLOW, STATUS_LABEL, timeAgo } from '../utils/helpers.js'
import './OrderStatusPage.css'

export default function OrderStatusPage() {
  const { orderId } = useParams()
  const { orders } = useOrders()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="status-page container">
        <h1>We can't find that order</h1>
        <p>It may have already been served, or the ID was typed wrong.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to menu</button>
      </div>
    )
  }

  const stepIndex = STATUS_FLOW.indexOf(order.status)

  return (
    <div className="status-page container">
      <span className="chip">{order.id}</span>
      <h1 className="status-page__title">Table {order.table}'s order</h1>
      <p className="status-page__sub">Sent {timeAgo(order.createdAt)}</p>

      <div className="status-track">
        {STATUS_FLOW.map((s, idx) => (
          <div key={s} className={`status-step ${idx <= stepIndex ? 'status-step--done' : ''}`}>
            <span className="status-step__dot" />
            <span className="status-step__label">{STATUS_LABEL[s]}</span>
          </div>
        ))}
      </div>

      <ul className="status-items">
        {order.items.map((it, idx) => (
          <li key={idx}>{it.qty}× {it.name}</li>
        ))}
      </ul>

      <button className="btn btn-ghost" onClick={() => navigate('/')}>Order more</button>
    </div>
  )
}
