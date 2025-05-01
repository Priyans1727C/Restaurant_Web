import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaUtensils } from 'react-icons/fa'
import MenuFilters from '../components/menu/MenuFilters'
import MenuList from '../components/menu/MenuList'

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Update page title with new restaurant name
    document.title = 'Menu | Bitey'
    // Scroll to top on page load with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  
  return (
    <div className="pt-24 pb-16 bg-ivory">
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
            Each dish is crafted with care and passion by our talented culinary team at Bitey.
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
        <MenuList activeCategory={activeCategory} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default MenuPage