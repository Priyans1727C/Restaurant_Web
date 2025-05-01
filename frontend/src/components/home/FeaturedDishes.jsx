import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaHeart, FaUtensils, FaRupeeSign } from 'react-icons/fa'
import { menuItems } from '../../utils/mockData'
import { useCart } from '../../context/cartUtils'

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
    <section className="section-padding bg-ivory py-20">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <span className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <FaUtensils className="text-primary text-xl inline-block" />
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Signature Bites</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Our chef&apos;s extraordinary creations that have become fan favorites at Bitey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularDishes.map((dish, index) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden p-4 transition-all"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative group">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 bg-primary text-white py-1 px-3 rounded-full text-xs">
                  {dish.category}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{dish.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{dish.description}</p>
              
              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-accent" />
                <span className="font-bold">4.9</span>
                <span className="text-xs text-gray-500">(120+ reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary flex items-center">
                  <FaRupeeSign className="text-sm mr-1" />
                  {parseInt(dish.price)}
                </span>
                
                <div className="flex gap-2">
                  <motion.button 
                    onClick={() => handleAddToCart(dish)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      addedItemId === dish.id ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-label="Add to cart"
                  >
                    <FaShoppingCart className="text-lg" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => toggleLike(dish.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      likedItems.has(dish.id) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-label="Add to favorites"
                  >
                    <FaHeart className="text-lg" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/menu" className="btn btn-primary rounded-full px-8 py-3 hover:scale-105 transition-transform">
            Explore Full Menu
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FeaturedDishes