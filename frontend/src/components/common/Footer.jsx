import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-serif mb-4">Gourmet Table</h3>
            <p className="mb-4 text-gray-300">
              Elevating dining to an art form since 2010. Experience culinary excellence in every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xl hover:text-accent transition-colors duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-xl hover:text-accent transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-xl hover:text-accent transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-xl hover:text-accent transition-colors duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-accent transition-colors duration-300">Menu</Link></li>
              <li><a href="#about" className="text-gray-300 hover:text-accent transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">Reservations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">Private Events</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-accent" />
                <span className="text-gray-300">123 Gourmet Avenue, Foodland, FL 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-accent" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <span className="text-gray-300">info@gourmettable.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-serif mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-300">
                <span>Monday - Thursday</span>
                <span>11am - 10pm</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Friday - Saturday</span>
                <span>11am - 11pm</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Sunday</span>
                <span>10am - 9pm</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Brunch (Weekends)</span>
                <span>10am - 2pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gourmet Table. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer