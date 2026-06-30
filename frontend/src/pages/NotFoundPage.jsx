import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', padding: 24 }}>
      <span className="chip">404</span>
      <h1 style={{ fontSize: 26 }}>This table doesn't exist</h1>
      <p style={{ color: 'var(--ink-soft)', maxWidth: 360 }}>
        Check the QR code on your table, or head back to the menu.
      </p>
      <Link to="/" className="btn btn-primary">Back to menu</Link>
    </div>
  )
}
