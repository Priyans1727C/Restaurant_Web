import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

function CartPage() {
  const { cart, clearCart } = useCart()
  
  useEffect(() => {
    // Update page title
    document.title = 'Your Cart | Gourmet Table'
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-ivory-dark">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Menu
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-serif text-2xl md:text-3xl">Your Cart</h1>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {cart.length > 0 ? (
                  cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <FaShoppingCart className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h2 className="text-xl font-serif mb-2">Your cart is empty</h2>
                    <p className="text-charcoal-light mb-6">
                      Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link to="/menu" className="btn btn-primary">
                      Browse Menu
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage