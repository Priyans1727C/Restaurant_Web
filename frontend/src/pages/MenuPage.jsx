import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaUtensils } from 'react-icons/fa'
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
    <div className="pt-24 pb-16 bg-ivory">
      {/* Hero Banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Menu Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Menu</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover our culinary creations crafted with passion and precision
            </p>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Culinary Excellence</span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">Seasonal Specialties</h2>
          <p className="text-charcoal-light">
            Our menu showcases the finest seasonal ingredients sourced from local farms and producers.
            Each dish is crafted with care and passion by our talented culinary team.
          </p>
        </motion.div>
        
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-charcoal"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <FaSearch className="text-primary" />
            </div>
          </div>
        </motion.div>
        
        {/* Decorative Icon */}
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <FaUtensils className="text-primary text-xl" />
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