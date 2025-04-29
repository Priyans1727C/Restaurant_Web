export const menuCategories = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
];

export const menuItems = [
  {
    id: 1,
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella',
    price: 14.99,
    image: 'https://images.pexels.com/photos/5836771/pexels-photo-5836771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'starters',
    popular: true
  },
  {
    id: 2,
    name: 'Calamari Fritti',
    description: 'Lightly fried squid with lemon aioli and marinara sauce',
    price: 12.99,
    image: 'https://images.pexels.com/photos/4611424/pexels-photo-4611424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'starters'
  },
  {
    id: 3,
    name: 'Bruschetta Trio',
    description: 'Classic tomato, mushroom truffle, and goat cheese with honey',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'starters'
  },
  {
    id: 4,
    name: 'Filet Mignon',
    description: '8oz center-cut filet with red wine reduction and truffle butter',
    price: 34.99,
    image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'mains',
    popular: true
  },
  {
    id: 5,
    name: 'Herb Roasted Chicken',
    description: 'Free-range half chicken with rosemary, thyme, and garlic',
    price: 22.99,
    image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'mains'
  },
  {
    id: 6,
    name: 'Lamb Rack',
    description: 'Herb crusted New Zealand lamb with mint gremolata',
    price: 32.99,
    image: 'https://images.pexels.com/photos/8470357/pexels-photo-8470357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'mains'
  },
  {
    id: 7,
    name: 'Grilled Salmon',
    description: 'Wild-caught salmon with lemon beurre blanc and asparagus',
    price: 27.99,
    image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'seafood',
    popular: true
  },
  {
    id: 8,
    name: 'Seafood Linguine',
    description: 'Shrimp, clams, mussels, and calamari in white wine sauce',
    price: 25.99,
    image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'seafood'
  },
  {
    id: 9,
    name: 'Seared Scallops',
    description: 'Pan-seared sea scallops with pea puree and bacon',
    price: 29.99,
    image: 'https://images.pexels.com/photos/3298633/pexels-photo-3298633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'seafood'
  },
  {
    id: 10,
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and parmesan',
    price: 18.99,
    image: 'https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'vegetarian'
  },
  {
    id: 11,
    name: 'Eggplant Parmesan',
    description: 'Layers of eggplant, tomato sauce, mozzarella, and basil',
    price: 17.99,
    image: 'https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'vegetarian'
  },
  {
    id: 12,
    name: 'Quinoa Bowl',
    description: 'Tri-color quinoa with roasted vegetables and tahini dressing',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'vegetarian'
  },
  {
    id: 13,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso, mascarpone, and cocoa',
    price: 8.99,
    image: 'https://images.pexels.com/photos/6133305/pexels-photo-6133305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'desserts',
    popular: true
  },
  {
    id: 14,
    name: 'Crème Brûlée',
    description: 'Rich vanilla custard with caramelized sugar crust',
    price: 9.99,
    image: 'https://images.pexels.com/photos/5946939/pexels-photo-5946939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'desserts'
  },
  {
    id: 15,
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla ice cream',
    price: 11.99,
    image: 'https://images.pexels.com/photos/4686976/pexels-photo-4686976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'desserts'
  },
  {
    id: 16,
    name: 'Red Wine',
    description: 'Selection of premium red wines by the glass',
    price: 12.99,
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks'
  },
  {
    id: 17,
    name: 'Craft Cocktails',
    description: 'Seasonal craft cocktails made with premium spirits',
    price: 14.99,
    image: 'https://images.pexels.com/photos/4667141/pexels-photo-4667141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks',
    popular: true
  },
  {
    id: 18,
    name: 'Italian Soda',
    description: 'Refreshing flavored sodas with cream',
    price: 5.99,
    image: 'https://images.pexels.com/photos/2109590/pexels-photo-2109590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'drinks'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    rating: 5,
    comment: 'The Filet Mignon was cooked to perfection. Best dining experience I\'ve had in years!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    rating: 5,
    comment: 'Impeccable service and the seafood linguine transported me straight to the Mediterranean.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    rating: 4,
    comment: 'The ambiance is so romantic and the truffle arancini appetizer is a must-try!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const chefs = [
  {
    id: 1,
    name: 'Antonio Rossi',
    title: 'Executive Chef',
    bio: 'With 20 years of experience in Michelin-starred restaurants across Italy and France, Chef Antonio brings authentic European flavors with a modern twist.',
    image: 'https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Maria Chen',
    title: 'Pastry Chef',
    bio: 'A graduate of Le Cordon Bleu, Chef Maria specializes in creating unforgettable desserts that blend classic techniques with innovative presentations.',
    image: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];