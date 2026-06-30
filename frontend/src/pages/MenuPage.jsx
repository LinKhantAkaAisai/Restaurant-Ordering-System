import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import FoodCard from '../components/FoodCard.jsx'
import { fetchMenu } from '../services/api.js'
import { useCart } from '../hooks/useCart.js'
import { getTableFromQuery, formatCurrency } from '../utils/helpers.js'
import './MenuPage.css'

export default function MenuPage() {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const { items, addItem, decrementItem, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()
  const tableNumber = getTableFromQuery()

  useEffect(() => {
    fetchMenu().then((data) => {
      setMenu(data)
      setLoading(false)
    })
  }, [])

  const categories = useMemo(() => {
    const unique = ['All', ...new Set(menu.map((m) => m.category))]
    return unique
  }, [menu])

  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') return menu
    return menu.filter((m) => m.category === activeCategory)
  }, [menu, activeCategory])

  function qtyFor(id) {
    const found = items.find((i) => i.id === id)
    return found ? found.qty : 0
  }

  return (
    <div className="menu-page">
      <Navbar tableNumber={tableNumber} />

      <section className="menu-hero container">
        <span className="chip menu-hero__eyebrow">Today's board</span>
        <h1 className="menu-hero__title">What sounds good tonight?</h1>
        <p className="menu-hero__sub">
          Tap a dish to add it to your order. We'll fire it to the kitchen the moment you send it.
        </p>
      </section>

      <nav className="menu-tabs container scrollbar-thin" aria-label="Menu categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tabs__btn ${activeCategory === cat ? 'menu-tabs__btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className="container menu-grid-wrap">
        {loading ? (
          <p className="menu-page__loading">Loading the board…</p>
        ) : (
          <div className="menu-grid">
            {visibleItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                qtyInCart={qtyFor(item.id)}
                onAdd={addItem}
                onRemove={decrementItem}
              />
            ))}
          </div>
        )}
      </main>

      {totalItems > 0 && (
        <div className="order-bar">
          <div className="container order-bar__row">
            <div className="order-bar__summary">
              <span className="order-bar__count">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
              <span className="order-bar__total">{formatCurrency(totalPrice)}</span>
            </div>
            <button className="btn btn-primary order-bar__cta" onClick={() => navigate('/cart')}>
              View order →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
