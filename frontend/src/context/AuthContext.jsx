import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './authUtils'

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // For demo purposes - in a real app, this would be an API call
  const login = (email) => {
    // Mock successful login
    const user = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '555-123-4567',
      address: '123 Main St, Anytown, USA',
      orders: [
        {
          id: 'ord-001',
          date: '2025-05-10',
          total: 87.50,
          status: 'Delivered',
          items: [
            { name: 'Truffle Pasta', quantity: 2, price: 24.99 },
            { name: 'Tiramisu', quantity: 1, price: 8.99 },
            { name: 'Red Wine', quantity: 1, price: 28.50 }
          ]
        },
        {
          id: 'ord-002',
          date: '2025-05-02',
          total: 62.75,
          status: 'Delivered',
          items: [
            { name: 'Grilled Salmon', quantity: 1, price: 27.99 },
            { name: 'Caesar Salad', quantity: 1, price: 11.50 },
            { name: 'Chocolate Soufflé', quantity: 2, price: 11.99 }
          ]
        }
      ]
    }
    
    setCurrentUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  const signup = (name, email) => {
    // Mock user creation
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone: '',
      address: '',
      orders: []
    }
    
    setCurrentUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates }
    setCurrentUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider