import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [staff, setStaff] = useState(() => {
    const saved = sessionStorage.getItem('staff')
    return saved ? JSON.parse(saved) : null
  })

  function login(name, pin) {
    // Placeholder check — replace with real call to backend auth route.
    if (pin === '1234') {
      const staffData = { name: name || 'Counter Staff' }
      sessionStorage.setItem('staff', JSON.stringify(staffData))
      setStaff(staffData)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem('staff')
    setStaff(null)
  }

  return <AuthContext.Provider value={{ staff, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
