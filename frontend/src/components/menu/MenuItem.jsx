import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import FoodDetailPopup from './FoodDetailPopup'

function MenuItem({ item }) {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const itemData = item.item_data;
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    // Format the item to match what the cart expects
    const cartItem = {
      id: itemData.id,
      name: itemData.name,
      description: itemData.description,
      price: parseFloat(itemData.price),
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
        onClick={() => setIsDetailOpen(true)}
      >
        <div className="aspect-square overflow-hidden">
          <img 
            src={itemData.image_url} 
            alt={itemData.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-1 line-clamp-1">{itemData.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{itemData.description}</p>
          
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-accent" />
            <span className="font-bold">{itemData.ratting || '4.5'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-500">${parseFloat(itemData.price).toFixed(2)}</span>
            
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isAdded ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Add to cart"
              >
                <FaShoppingCart className="text-lg" />
              </button>
              
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
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
          price: parseFloat(itemData.price),
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

export default MenuItem