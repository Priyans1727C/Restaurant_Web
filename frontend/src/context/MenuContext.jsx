import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMenuCategories, fetchAllMenuItems } from '../services/restaurantApi';
import PropTypes from 'prop-types';

// Create the context
export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu categories and menu items on component mount
  useEffect(() => {
    async function loadMenuData() {
      setIsLoading(true);
      try {
        // Fetch both categories and menu items in parallel
        const [categoriesData, menuItemsData] = await Promise.all([
          fetchMenuCategories(),
          fetchAllMenuItems()
        ]);

        setCategories(categoriesData);
        setMenuItems(menuItemsData);
        setError(null);
      } catch (err) {
        console.error('Error loading menu data:', err);
        setError('Failed to load menu data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadMenuData();
  }, []);

  // Group menu items by category for easier access
  const menuItemsByCategory = {};
  menuItems.forEach(item => {
    const menuId = item.menu_id;
    if (!menuItemsByCategory[menuId]) {
      menuItemsByCategory[menuId] = [];
    }
    menuItemsByCategory[menuId].push(item);
  });

  const value = {
    categories,
    menuItems,
    menuItemsByCategory,
    isLoading,
    error,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Custom hook to use the menu context
export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}

export default MenuContext;