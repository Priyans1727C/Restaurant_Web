import { createContext, useContext } from 'react'

// Create context in a separate file
export const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}