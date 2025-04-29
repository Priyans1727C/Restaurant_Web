// Restaurant API Service
const BASE_URL = 'http://127.0.0.1:8000/api/restaurant';
const STORE_ID = 1; // Default store ID

/**
 * Fetch all menu categories
 * @returns {Promise<Array>} Array of menu categories
 */
export const fetchMenuCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menu/?store_id=${STORE_ID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw error;
  }
};

/**
 * Fetch all menu items
 * @returns {Promise<Array>} Array of menu items with their details
 */
export const fetchAllMenuItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menu/item/?store_id=${STORE_ID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

/**
 * Fetch menu items for a specific category
 * @param {number} menuId - The ID of the menu/category
 * @returns {Promise<Array>} Array of menu items for the specified category
 */
export const fetchMenuItemsByCategory = async (menuId) => {
  try {
    const response = await fetch(`${BASE_URL}/menu/item/?store_id=${STORE_ID}&menu_id=${menuId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items for category ${menuId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching menu items for category ${menuId}:`, error);
    throw error;
  }
};