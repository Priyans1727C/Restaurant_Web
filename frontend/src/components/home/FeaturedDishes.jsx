import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { menuItems } from '../../utils/mockData'
import { useCart } from '../../context/CartContext'

function FeaturedDishes() {
  const { addToCart } = useCart()
  const [addedItemId, setAddedItemId] = useState(null)
  const [likedItems, setLikedItems] = useState(new Set())
  
  const popularDishes = menuItems.filter(item => item.popular)
  
  const handleAddToCart = (dish) => {
    addToCart(dish)
    setAddedItemId(dish.id)
    
    setTimeout(() => {
      setAddedItemId(null)
    }, 1500)
  }
  
  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(id)) {
        newLiked.delete(id)
      } else {
        newLiked.add(id)
      }
      return newLiked
    })
  }
  
  return (
    <section className="section-padding bg-ivory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Signature Dishes</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Experience our chef&apos;s special creations that have captivated the hearts and palates of our guests.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularDishes.map((dish) => (
            <motion.div 
              key={dish.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden p-4"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-1">{dish.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
              
              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-accent" />
                <span className="font-bold">4.9</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-red-500">${dish.price.toFixed(2)}</span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(dish)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      addedItemId === dish.id ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-label="Add to cart"
                  >
                    <FaShoppingCart className="text-lg" />
                  </button>
                  
                  <button
                    onClick={() => toggleLike(dish.id)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      likedItems.has(dish.id) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-label="Add to favorites"
                  >
                    <FaHeart className="text-lg" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/menu" className="btn btn-primary">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDishes