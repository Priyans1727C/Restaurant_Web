import { createContext, useContext } from 'react'

// Create context in a separate file
export const MenuContext = createContext()

export function useMenu() {
  return useContext(MenuContext)
}