import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../../utils/mockData'
import { FaStar } from 'react-icons/fa'

function Testimonials() {
  const [current, setCurrent] = useState(0)
  
  // Auto play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="section-padding bg-charcoal text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">What Our Guests Say</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-accent">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className={index < testimonials[current].rating ? "text-accent" : "text-gray-400"} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-xl mb-6 italic">
                    "{testimonials[current].comment}"
                  </p>
                  
                  <h4 className="font-serif text-xl">{testimonials[current].name}</h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  current === index ? 'bg-accent' : 'bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials