import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMenu } from '../../context/MenuContext'
import PropTypes from 'prop-types'

function MenuFilters({ activeCategory, setActiveCategory }) {
  const { categories, isLoading } = useMenu();
  
  // Reset to "all" when categories change
  useEffect(() => {
    setActiveCategory('all');
  }, [categories, setActiveCategory]);

  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="flex justify-center flex-wrap gap-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse h-12 w-28 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex justify-center flex-wrap gap-3 min-w-max mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
              activeCategory === 'all'
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-white border border-gray-200 text-charcoal hover:bg-gray-50 hover:border-primary'
            }`}
          >
            All Menu
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-md transform scale-105'
                  : 'bg-white border border-gray-200 text-charcoal hover:bg-gray-50 hover:border-primary'
              }`}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <div className="h-[1px] w-16 bg-primary opacity-50"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="h-[1px] w-16 bg-primary opacity-50"></div>
      </div>
    </motion.div>
  )
}

MenuFilters.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired
}

export default MenuFilters