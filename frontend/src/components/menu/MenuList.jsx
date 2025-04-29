import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import MenuItem from './MenuItem'
import { useMenu } from '../../context/MenuContext'
import { fetchMenuItemsByCategory } from '../../services/restaurantApi'

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-serif mb-2">Error loading menu items</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItem key={item.item_data.id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-serif mb-2">No items found</h3>
            <p className="text-charcoal-light">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MenuList