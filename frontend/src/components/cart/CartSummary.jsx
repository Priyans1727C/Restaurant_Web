import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

function CartSummary() {
  const { totalItems, totalPrice } = useCart()
  
  // Calculate tax and total
  const tax = totalPrice * 0.08 // 8% tax
  const deliveryFee = 5.99
  const finalTotal = totalPrice + tax + deliveryFee
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-charcoal-light">Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-light">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-light">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span className="text-primary">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Link
        to="/checkout"
        className={`btn btn-primary w-full text-center ${
          totalItems === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={(e) => totalItems === 0 && e.preventDefault()}
      >
        Proceed to Checkout
      </Link>
      
      <div className="text-center mt-4">
        <Link to="/menu" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  )
}

export default CartSummary