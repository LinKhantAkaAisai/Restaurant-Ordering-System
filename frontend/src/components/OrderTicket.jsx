import { STATUS_FLOW, STATUS_LABEL, timeAgo } from '../utils/helpers'
import './OrderTicket.css'

export default function OrderTicket({ order, onAdvance }) {
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]

  return (
    <div className={`ticket ticket--${order.status}`}>
      <div className="ticket__perf" aria-hidden="true" />
      <div className="ticket__body">
        <div className="ticket__head">
          <span className="ticket__id">{order.id}</span>
          <span className="ticket__table">TABLE {order.table}</span>
        </div>

        <div className="ticket__rule" />

        <ul className="ticket__items">
          {order.items.map((it, idx) => (
            <li key={idx}>
              <span className="ticket__qty">{it.qty}×</span>
              <span className="ticket__item-name">{it.name}</span>
              {it.note && <span className="ticket__note">— {it.note}</span>}
            </li>
          ))}
        </ul>

        <div className="ticket__rule" />

        <div className="ticket__foot">
          <span className={`chip ticket__status ticket__status--${order.status}`}>
            {STATUS_LABEL[order.status]}
          </span>
          <span className="ticket__time">{timeAgo(order.createdAt)}</span>
        </div>

        {nextStatus && (
          <button className="btn btn-primary ticket__advance" onClick={() => onAdvance(order.id, nextStatus)}>
            Mark as {STATUS_LABEL[nextStatus]}
          </button>
        )}
      </div>
    </div>
  )
}
