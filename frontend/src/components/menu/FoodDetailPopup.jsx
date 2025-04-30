import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import PropTypes from 'prop-types'

function FoodDetailPopup({ item, isOpen, onClose, isLiked, onLike }) {
  const { addToCart } = useCart()
  
  if (!isOpen) return null
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="aspect-video w-full">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <div className="flex items-center gap-2">
                  <FaStar className="text-accent" />
                  <span className="font-bold">4.9</span>
                  <span className="text-gray-500">(120+ reviews)</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-500">
                ${item.price.toFixed(2)}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{item.description}</p>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold mb-4">Ingredients</h3>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {['Fresh vegetables', 'Premium meat', 'Organic herbs', 'Special sauce'].map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold mb-4">Dietary Information</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Gluten-free', 'Dairy-free', 'Vegan option available'].map((info, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {info}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
              >
                <FaShoppingCart className="inline-block mr-2" />
                Add to Cart
              </button>
              <button
                onClick={onLike}
                className={`p-3 rounded-full transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaHeart className="text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

FoodDetailPopup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired
}

export default FoodDetailPopup