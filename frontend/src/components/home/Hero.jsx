import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Exquisite Dining Experience
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Savor the artistry of culinary excellence in every bite
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/menu" className="btn btn-primary">
              Explore Menu
            </Link>
            <a href="#book-table" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-charcoal">
              Book a Table
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-10"
        animate={{ 
          y: [0, 10, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

export default Hero