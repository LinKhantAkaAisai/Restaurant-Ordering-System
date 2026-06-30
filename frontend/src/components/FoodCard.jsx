import { formatCurrency } from '../utils/helpers'
import './FoodCard.css'

export default function FoodCard({ item, qtyInCart, onAdd, onRemove }) {
  const soldOut = !item.available

  return (
    <div className={`food-card ${soldOut ? 'food-card--soldout' : ''}`}>
      <div className="food-card__top">
        <h3 className="food-card__name">{item.name}</h3>
        <span className="food-card__price">{formatCurrency(item.price)}</span>
      </div>
      <p className="food-card__desc">{item.desc}</p>

      <div className="food-card__bottom">
        {soldOut ? (
          <span className="chip food-card__soldout-chip">Sold out today</span>
        ) : qtyInCart > 0 ? (
          <div className="food-card__stepper">
            <button aria-label={`Remove one ${item.name}`} onClick={() => onRemove(item.id)}>−</button>
            <span>{qtyInCart}</span>
            <button aria-label={`Add one more ${item.name}`} onClick={() => onAdd(item)}>+</button>
          </div>
        ) : (
          <button className="btn btn-primary food-card__add" onClick={() => onAdd(item)}>
            Add to order
          </button>
        )}
      </div>
    </div>
  )
}
