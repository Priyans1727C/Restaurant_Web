import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import MenuFilters from '../components/menu/MenuFilters'
import MenuList from '../components/menu/MenuList'

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Update page title
    document.title = 'Menu | Gourmet Table'
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="pt-24 pb-16">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Menu Banner" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-xl"
          >
            Discover our culinary creations crafted with passion and precision
          </motion.p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Filters */}
        <MenuFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        {/* Menu Items */}
        <MenuList category={activeCategory} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default MenuPage