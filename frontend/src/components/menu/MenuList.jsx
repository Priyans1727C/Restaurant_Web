import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MenuItem from './MenuItem'
import { useMenu } from '../../context/MenuContext'
import { fetchMenuItemsByCategory } from '../../services/restaurantApi'
import PropTypes from 'prop-types'
import { FaUtensils } from 'react-icons/fa'

function MenuList({ category, searchQuery }) {
  const { menuItems, isLoading, error } = useMenu();
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function filterItems() {
      setLoading(true);
      try {
        let items = [];
        
        // If category is 'all', use all menu items, otherwise fetch by category
        if (category === 'all') {
          items = [...menuItems];
        } else {
          // We can use the existing items for the selected category
          // or fetch them specifically if needed
          const categoryItems = await fetchMenuItemsByCategory(category);
          items = categoryItems;
        }
        
        // Filter by search query if provided
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          items = items.filter(item => {
            const itemName = item.item_data?.name?.toLowerCase() || '';
            const itemDesc = item.item_data?.description?.toLowerCase() || '';
            return itemName.includes(query) || itemDesc.includes(query);
          });
        }
        
        setFilteredItems(items);
      } catch (err) {
        console.error('Error filtering items:', err);
      } finally {
        setLoading(false);
      }
    }
    
    filterItems();
  }, [category, searchQuery, menuItems]);

  if (isLoading || loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/6"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
              <div className="flex justify-between">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center my-8"
      >
        <h3 className="text-xl font-serif mb-2">Error loading menu items</h3>
        <p>{error}</p>
      </motion.div>
    );
  }
  
  if (filteredItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-6">
          <FaUtensils className="text-primary text-xl" />
        </div>
        <h3 className="text-2xl font-serif mb-3">No dishes found</h3>
        <p className="text-charcoal-light max-w-md mx-auto">
          We couldn&apos;t find any dishes that match your search criteria. Please try adjusting your search or browse our other categories.
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredItems.map(item => (
          <MenuItem key={item.item_data.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  )
}

MenuList.propTypes = {
  category: PropTypes.string.isRequired,
  searchQuery: PropTypes.string
}

export default MenuList