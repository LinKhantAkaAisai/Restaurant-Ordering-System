import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrderContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import OrderTicket from '../components/OrderTicket.jsx'
import { STATUS_FLOW, STATUS_LABEL } from '../utils/helpers.js'
import './CounterDashboard.css'

export default function CounterDashboard() {
  const { orders, updateStatus, connected } = useOrders()
  const { staff, logout } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('active')

  const counts = useMemo(() => {
    const c = { pending: 0, cooking: 0, served: 0 }
    orders.forEach((o) => { c[o.status] = (c[o.status] || 0) + 1 })
    return c
  }, [orders])

  const filteredOrders = useMemo(() => {
    if (filter === 'active') return orders.filter((o) => o.status !== 'served')
    if (filter === 'all') return orders
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  function handleLogout() {
    logout()
    navigate('/staff/login')
  }

  return (
    <div className="dash">
      <header className="dash__header">
        <div className="container dash__header-row">
          <div>
            <span className="chip dash__live-chip">
              <span className={`dash__dot ${connected ? 'dash__dot--on' : ''}`} />
              {connected ? 'Live' : 'Offline mode'}
            </span>
            <h1 className="dash__title">Counter — order queue</h1>
          </div>
          <div className="dash__header-right">
            {staff && <span className="dash__staff">Signed in as {staff.name}</span>}
            <button className="btn btn-ghost dash__logout" onClick={handleLogout}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="container dash__stats">
        {STATUS_FLOW.map((s) => (
          <div className={`dash__stat dash__stat--${s}`} key={s}>
            <span className="dash__stat-num">{counts[s] || 0}</span>
            <span className="dash__stat-label">{STATUS_LABEL[s]}</span>
          </div>
        ))}
      </div>

      <div className="container dash__filters">
        {['active', 'pending', 'cooking', 'served', 'all'].map((f) => (
          <button
            key={f}
            className={`dash__filter-btn ${filter === f ? 'dash__filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'active' ? 'Active' : f === 'all' ? 'All' : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      <main className="container dash__grid">
        {filteredOrders.length === 0 ? (
          <p className="dash__empty">No orders here right now.</p>
        ) : (
          filteredOrders.map((order) => (
            <OrderTicket key={order.id} order={order} onAdvance={updateStatus} />
          ))
        )}
      </main>
    </div>
  )
}
