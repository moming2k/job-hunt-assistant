import React, { createContext, useContext, useState, ReactNode } from 'react'

// 1) Define the shape of your context.
interface StatusContextType {
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
}

// 2) Create the context with a default value or undefined.
const StatusContext = createContext<StatusContextType | undefined>(undefined)

// 3) Create a provider component.
export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState('idle')

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  )
}

// 4) Custom hook for consuming this context.
export function useStatus() {
  const context = useContext(StatusContext)
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider')
  }
  return context
}