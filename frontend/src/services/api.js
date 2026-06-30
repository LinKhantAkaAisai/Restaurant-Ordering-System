const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ---- Mock data used until the backend endpoints are wired up ----
export const MOCK_MENU = [
  { id: 'm1', name: 'Charred Corn Quesadilla', category: 'Starters', price: 6.5, desc: 'Roasted corn, smoked cheddar, pickled jalapeño.', available: true },
  { id: 'm2', name: 'Crispy Cauliflower Bites', category: 'Starters', price: 7.0, desc: 'Chili-lime glaze, sesame, scallion.', available: true },
  { id: 'm3', name: 'Smoked Beef Brisket Bowl', category: 'Mains', price: 14.0, desc: '12-hour smoked brisket, rice, slaw, house pickles.', available: true },
  { id: 'm4', name: 'Garden Herb Pasta', category: 'Mains', price: 12.5, desc: 'Tagliatelle, basil-pistachio pesto, parmesan.', available: true },
  { id: 'm5', name: 'Spicy Korean Fried Chicken', category: 'Mains', price: 13.5, desc: 'Gochujang glaze, sesame, pickled radish.', available: false },
  { id: 'm6', name: 'Grilled Salmon Teriyaki', category: 'Mains', price: 16.0, desc: 'Charred broccolini, sticky rice, citrus glaze.', available: true },
  { id: 'm7', name: 'Classic Tiramisu', category: 'Desserts', price: 6.0, desc: 'Espresso-soaked ladyfingers, mascarpone.', available: true },
  { id: 'm8', name: 'Burnt Basque Cheesecake', category: 'Desserts', price: 6.5, desc: 'Caramelized top, vanilla bean.', available: true },
  { id: 'm9', name: 'Iced Vietnamese Coffee', category: 'Drinks', price: 4.5, desc: 'Condensed milk, dark roast.', available: true },
  { id: 'm10', name: 'House Lemonade', category: 'Drinks', price: 3.5, desc: 'Fresh-pressed, mint.', available: true },
  { id: 'm11', name: 'Yuzu Soda', category: 'Drinks', price: 4.0, desc: 'Sparkling, citrus.', available: true },
]

export async function fetchMenu() {
  try {
    const res = await fetch(`${API_URL}/menu`)
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch (err) {
    // Backend not available yet — fall back to mock data so the UI is usable standalone.
    return MOCK_MENU
  }
}

export async function submitOrder(order) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch (err) {
    // Fallback: resolve locally so the demo flow keeps working offline.
    return {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_URL}/orders`)
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch (err) {
    return null
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch (err) {
    return { id: orderId, status }
  }
}
