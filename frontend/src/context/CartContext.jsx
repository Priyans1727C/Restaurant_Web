import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './cartUtils'

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Update totals when cart changes
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
    const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    setTotalItems(itemCount)
    setTotalPrice(price)
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id)
      
      if (existingItemIndex !== -1) {
        // Item already exists, increment quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        }
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Re-export the useCart hook to maintain backward compatibility
export { useCart } from './cartUtils'