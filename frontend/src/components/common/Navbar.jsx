import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { currentUser } = useAuth()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
  }, [location])

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || mobileMenuOpen || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
  }`

  const linkClasses = `font-medium transition-colors duration-300 hover:text-primary ${
    isScrolled || mobileMenuOpen || !isHomePage ? 'text-charcoal' : 'text-white'
  }`

  const logoClasses = `font-serif text-2xl font-bold transition-colors duration-300 ${
    isScrolled || mobileMenuOpen || !isHomePage ? 'text-primary' : 'text-white'
  }`

  const iconClass = isScrolled || mobileMenuOpen || !isHomePage ? 'text-charcoal' : 'text-white'

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className={logoClasses}>
          Gourmet Table
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkClasses}>Home</Link>
          <Link to="/menu" className={linkClasses}>Menu</Link>
          <Link to="/about" className={linkClasses}>About</Link>
          <Link to="/contact" className={linkClasses}>Contact</Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FaShoppingCart className={`text-xl ${iconClass}`} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-charcoal-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <FaUser className={`text-xl ${iconClass}`} />
              ) : (
                <FaSignInAlt className={`text-xl ${iconClass}`} />
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-4">
            <FaShoppingCart className={`text-xl ${iconClass}`} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-charcoal-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-charcoal" />
            ) : (
              <FaBars className={iconClass} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-charcoal py-2 border-b border-gray-100">Home</Link>
            <Link to="/menu" className="text-charcoal py-2 border-b border-gray-100">Menu</Link>
            <Link to="/about" className="text-charcoal py-2 border-b border-gray-100">About</Link>
            <Link to="/contact" className="text-charcoal py-2 border-b border-gray-100">Contact</Link>
            <Link to="/profile" className="text-charcoal py-2 border-b border-gray-100">Profile</Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar