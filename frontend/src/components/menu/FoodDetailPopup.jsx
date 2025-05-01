import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaStar, FaShoppingCart, FaHeart, FaTimes, FaLeaf, FaMinus, FaPlus, FaRupeeSign } from 'react-icons/fa'
import { useCart } from '../../context/cartUtils'
import PropTypes from 'prop-types'

function FoodDetailPopup({ item, isOpen, onClose, isLiked, onLike }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([])
  
  if (!isOpen) return null
  
  const increaseQuantity = () => setQuantity(prev => prev + 1)
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(prev => prev.filter(opt => opt !== option))
    } else {
      setSelectedOptions(prev => [...prev, option])
    }
  }
  
  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      quantity,
      options: selectedOptions,
    }
    addToCart(itemToAdd)
    onClose()
  }
  
  // Mock options data with prices in INR
  const options = [
    { id: 1, name: 'Extra sauce', price: 110 },
    { id: 2, name: 'Double portion', price: 375 },
    { id: 3, name: 'Add cheese', price: 150 },
    { id: 4, name: 'Make it spicy', price: 40 },
  ]
  
  // Mock ingredients - in a real app this would come from the backend
  const ingredients = ['Premium ingredients', 'Fresh vegetables', 'House special sauce', 'Organic herbs', 'Artisan bread']
  
  // Mock dietary info - in a real app this would come from the backend
  const dietaryInfo = item.isVegetarian 
    ? ['Vegetarian', 'Dairy-free option available'] 
    : ['Gluten-free option available', 'Contains meat']
  
  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scroll-smooth"
          onClick={e => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square w-full h-full">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Vegetarian badge if applicable */}
              {item.isVegetarian && (
                <div className="absolute top-4 left-4 z-10 bg-green-500 text-white py-1 px-3 rounded-full flex items-center text-sm font-medium">
                  <FaLeaf className="mr-2" />
                  Vegetarian
                </div>
              )}
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md text-charcoal hover:bg-gray-100 transition-colors"
                aria-label="Close popup"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {/* Content Section */}
            <div className="p-8 relative">
              <div className="mb-6">
                <h2 className="text-3xl font-serif font-bold mb-3">{item.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-accent" />
                    <span className="font-bold">4.9</span>
                  </div>
                  <span className="text-charcoal-light">(120+ reviews)</span>
                  <span className="text-charcoal-light">•</span>
                  <span className="text-charcoal-light">{item.category}</span>
                </div>
                <p className="text-charcoal-light mb-6">{item.description}</p>
                <p className="text-2xl font-bold text-primary flex items-center">
                  <FaRupeeSign className="text-xl mr-1" />
                  {item.price}
                </p>
              </div>
              
              {/* Ingredients Section */}
              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl mb-4">Ingredients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-charcoal-light">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Options Section */}
              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl mb-4">Customize Your Order</h3>
                <div className="space-y-3">
                  {options.map(option => (
                    <div 
                      key={option.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedOptions.includes(option.name)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                      onClick={() => toggleOption(option.name)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 border rounded-full ${
                          selectedOptions.includes(option.name) 
                            ? 'border-primary bg-primary' 
                            : 'border-gray-300'
                        }`}></div>
                        <span className="font-medium">{option.name}</span>
                      </div>
                      <div className="text-primary font-medium flex items-center">
                        +<FaRupeeSign className="text-xs mr-1" />
                        {option.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dietary Information */}
              <div className="mb-8">
                <h3 className="font-serif font-bold text-xl mb-4">Dietary Information</h3>
                <div className="flex flex-wrap gap-2">
                  {dietaryInfo.map((info, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-charcoal-light">
                      {info}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Add to cart section */}
              <div className="mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button 
                      onClick={decreaseQuantity}
                      className="p-3 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors rounded-l-full"
                      disabled={quantity <= 1}
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-5 font-medium">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="p-3 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors rounded-r-full"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-full font-bold hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={onLike}
                    className={`p-3 rounded-full transition-colors ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                    }`}
                    aria-label="Add to favorites"
                  >
                    <FaHeart className="text-lg" />
                  </button>
                </div>
              </div>
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
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    isVegetarian: PropTypes.bool
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired
}

export default FoodDetailPopup