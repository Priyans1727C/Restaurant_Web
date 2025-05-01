import { createContext, useContext } from 'react'

// Create context in a separate file
export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}