import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaShoppingCart, FaHeart, FaLeaf, FaRupeeSign } from 'react-icons/fa'
import { useCart } from '../../context/cartUtils'
import FoodDetailPopup from './FoodDetailPopup'
import PropTypes from 'prop-types'

function MenuItem({ item }) {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const itemData = item.item_data;
  
  // Use actual price from the API and convert to integer
  const priceInINR = parseInt(parseFloat(itemData.price));
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    // Format the item to match what the cart expects
    const cartItem = {
      id: itemData.id,
      name: itemData.name,
      description: itemData.description,
      price: priceInINR,
      image: itemData.image_url,
      category: item.menu_name
    };
    
    addToCart(cartItem)
    setIsAdded(true)
    
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }
  
  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }
  
  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group transform transition-transform hover:-translate-y-2 hover:shadow-xl"
        onClick={() => setIsDetailOpen(true)}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          {/* Vegetarian badge if applicable */}
          {itemData.is_vegetarian && (
            <div className="absolute top-3 left-3 z-10 bg-green-500 text-white py-1 px-2 rounded-full flex items-center text-xs font-medium">
              <FaLeaf className="mr-1" />
              Vegetarian
            </div>
          )}
          
          <img 
            src={itemData.image_url} 
            alt={itemData.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick add to cart button that appears on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                isAdded ? 'bg-secondary text-white' : 'bg-accent text-charcoal-dark hover:bg-accent-dark'
              }`}
            >
              {isAdded ? 'Added to Cart' : 'Quick Add'}
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">{itemData.name}</h3>
            <span className="font-bold text-primary flex items-center">
              <FaRupeeSign className="text-sm" />
              {priceInINR}
            </span>
          </div>
          
          <p className="text-charcoal-light text-sm mb-3 line-clamp-2">{itemData.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaStar className="text-accent" />
              <span className="font-medium">{itemData.ratting || '4.5'}</span>
              <span className="text-charcoal-light text-xs">(120+ reviews)</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isAdded 
                    ? 'bg-secondary text-white rotate-12' 
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label="Add to cart"
              >
                <FaShoppingCart className="text-lg" />
              </button>
              
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white scale-110' 
                    : 'bg-primary/10 text-primary hover:bg-red-500 hover:text-white'
                }`}
                aria-label="Add to favorites"
              >
                <FaHeart className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <FoodDetailPopup
        item={{
          id: itemData.id,
          name: itemData.name,
          description: itemData.description, 
          price: priceInINR,
          image: itemData.image_url,
          category: item.menu_name,
          isVegetarian: itemData.is_vegetarian
        }}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isLiked={isLiked}
        onLike={handleLike}
      />
    </>
  )
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    item_data: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image_url: PropTypes.string.isRequired,
      ratting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      is_vegetarian: PropTypes.bool
    }).isRequired,
    menu_name: PropTypes.string.isRequired
  }).isRequired
}

export default MenuItem