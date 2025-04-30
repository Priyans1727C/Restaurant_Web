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
      <div className="overflow-x-auto pb-4 mb-8">
        <div className="flex space-x-2">
          <div className="animate-pulse h-12 w-24 bg-gray-200 rounded-full"></div>
          <div className="animate-pulse h-12 w-32 bg-gray-200 rounded-full"></div>
          <div className="animate-pulse h-12 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 mb-8">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-6 py-3 rounded-full transition-colors duration-300 ${
            activeCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full transition-colors duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category.category_name}
          </button>
        ))}
      </div>
      
      {/* Active indicator line */}
      <div className="relative h-1 w-full mt-2">
        <motion.div
          className="absolute h-1 bg-primary rounded-full"
          initial={false}
          animate={{
            left: document.querySelector(
              `button:nth-child(${
                activeCategory === 'all' ? 1 : categories.findIndex(c => c.id === activeCategory) + 2
              })`
            )?.offsetLeft || 0,
            width: document.querySelector(
              `button:nth-child(${
                activeCategory === 'all' ? 1 : categories.findIndex(c => c.id === activeCategory) + 2
              })`
            )?.offsetWidth || 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}

MenuFilters.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired
}

export default MenuFilters