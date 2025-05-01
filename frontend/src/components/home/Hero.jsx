import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUtensils, FaClock, FaLeaf } from 'react-icons/fa'

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background with white theme */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-white relative">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full transform rotate-12"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-tr-full"></div>
          <div className="absolute top-1/3 left-1/5 w-16 h-16 bg-primary/10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full"></div>
          
          {/* Decorative patterns */}
          <motion.div 
            className="absolute right-20 top-20 w-64 h-64 opacity-20"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img 
              src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Food decoration" 
              className="w-full h-full object-cover rounded-full opacity-50"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left mb-10 md:mb-0"
        >
          <motion.div 
            className="inline-block mb-4 p-2 border-b-2 border-primary"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Welcome to</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold mb-4 text-charcoal"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-primary">Bitey</span> 
            <span className="block text-charcoal text-3xl md:text-5xl mt-2">Delicious Moments</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-charcoal-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Where every bite tells a delicious story
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/menu" className="btn btn-primary rounded-full px-8 py-3 text-lg hover:scale-105 transition-transform">
              Explore Menu
            </Link>
            <a href="#book-table" className="btn bg-white border-2 border-primary text-primary rounded-full px-8 py-3 text-lg hover:bg-primary hover:text-white hover:scale-105 transition-all">
              Book a Table
            </a>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center md:justify-start gap-8 mt-10"
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <FaLeaf className="text-primary" />
              </div>
              <span className="text-sm font-medium text-charcoal">Fresh Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <FaClock className="text-primary" />
              </div>
              <span className="text-sm font-medium text-charcoal">Fast Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <FaUtensils className="text-primary" />
              </div>
              <span className="text-sm font-medium text-charcoal">Quality Food</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block relative w-full max-w-md"
        >
          <div className="relative z-10">
            <img 
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Featured dish" 
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-primary text-white p-6 rounded-full shadow-lg">
            <div className="text-center">
              <span className="block text-3xl font-bold">50%</span>
              <span className="text-sm font-medium">First Order</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-charcoal z-10"
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