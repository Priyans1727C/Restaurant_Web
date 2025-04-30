import { motion } from 'framer-motion'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import PropTypes from 'prop-types'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-charcoal-light text-sm">${item.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="ml-4 flex items-center">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <FaMinus className="text-xs" />
        </button>
        
        <div className="w-10 h-8 flex items-center justify-center bg-gray-100 border-x border-white">
          {item.quantity}
        </div>
        
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
      
      <div className="ml-6 text-right min-w-20">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </motion.div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
}

export default CartItem