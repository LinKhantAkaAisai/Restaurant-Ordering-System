import { useEffect, useRef } from 'react'
import { connectSocket, disconnectSocket } from '../services/socket'

export function useSocket(eventHandlers = {}) {
  const handlersRef = useRef(eventHandlers)
  handlersRef.current = eventHandlers

  useEffect(() => {
    const socket = connectSocket()
    const entries = Object.entries(handlersRef.current)
    entries.forEach(([event, handler]) => socket.on(event, handler))

    return () => {
      entries.forEach(([event, handler]) => socket.off(event, handler))
      disconnectSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
