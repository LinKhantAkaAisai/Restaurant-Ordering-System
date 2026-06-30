import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import './Navbar.css'

export default function Navbar({ tableNumber }) {
  const { totalItems } = useCart()
  const location = useLocation()
  const onCart = location.pathname === '/cart'

  return (
    <header className="nav">
      <div className="container nav__row">
        <Link to="/" className="nav__brand">
          <span className="nav__brand-mark">TC</span>
          <span className="nav__brand-text">
            The Counter
            {tableNumber && <span className="nav__table">Table {tableNumber}</span>}
          </span>
        </Link>

        {!onCart && (
          <Link to="/cart" className="nav__cart">
            <span>Cart</span>
            <span className="nav__cart-count">{totalItems}</span>
          </Link>
        )}
        {onCart && (
          <Link to="/" className="nav__cart nav__cart--ghost">
            ← Back to menu
          </Link>
        )}
      </div>
    </header>
  )
}
