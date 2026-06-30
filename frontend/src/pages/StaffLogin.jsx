import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import './StaffLogin.css'

export default function StaffLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const ok = login(name, pin)
    if (ok) {
      navigate('/counter')
    } else {
      setError('Incorrect PIN. Try 1234 for the demo.')
    }
  }

  return (
    <div className="staff-login">
      <form className="staff-login__card" onSubmit={handleSubmit}>
        <span className="chip staff-login__chip">Staff access</span>
        <h1 className="staff-login__title">Sign in to the counter</h1>
        <p className="staff-login__sub">Enter your name and counter PIN to see live orders.</p>

        <Input label="Name" placeholder="e.g. Aung" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="PIN"
          type="password"
          inputMode="numeric"
          placeholder="••••"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        {error && <p className="staff-login__error">{error}</p>}

        <Button type="submit" className="staff-login__submit">Sign in</Button>
      </form>
    </div>
  )
}
