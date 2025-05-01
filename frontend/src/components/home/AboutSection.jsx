import { motion } from 'framer-motion'
import { FaLeaf, FaClock, FaAward } from 'react-icons/fa'

function AboutSection() {
  return (
    <section id="about" className="section-padding py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Bitey restaurant interior" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-56 h-56 hidden lg:block">
              <div className="w-full h-full rounded-2xl bg-primary p-6 text-white flex flex-col justify-center transform hover:rotate-3 transition-transform">
                <p className="font-serif text-4xl mb-2 font-bold">13+</p>
                <p className="text-sm">Years of creating unforgettable dining experiences</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-6"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-6">The Bitey Journey</h2>
            
            <p className="text-charcoal-light mb-6 text-lg">
              Founded in 2010, Bitey began with a simple mission: create a dining experience that celebrates the art of food while providing unmatched hospitality. Our journey started with Executive Chef Antonio Rossi&apos;s vision to blend traditional techniques with innovative approaches.
            </p>
            
            <p className="text-charcoal-light mb-8 text-lg">
              We source only the finest ingredients from local farmers and sustainable providers. Every bite is crafted with precision and care, resulting in flavors that tell a story of tradition, innovation, and passion. Our dining room is designed to create an atmosphere of casual elegance, allowing you to focus on what matters most – amazing food and great company.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="text-center p-6 border border-gray-200 rounded-xl shadow-sm hover:border-primary transition-colors"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLeaf className="text-primary text-xl" />
                </div>
                <p className="font-serif text-2xl text-primary mb-1">Fresh</p>
                <p className="text-sm text-charcoal-light">Ingredients</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="text-center p-6 border border-gray-200 rounded-xl shadow-sm hover:border-primary transition-colors"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-primary text-xl" />
                </div>
                <p className="font-serif text-2xl text-primary mb-1">Quick</p>
                <p className="text-sm text-charcoal-light">Service</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="text-center p-6 border border-gray-200 rounded-xl shadow-sm hover:border-primary transition-colors"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaAward className="text-primary text-xl" />
                </div>
                <p className="font-serif text-2xl text-primary mb-1">Award</p>
                <p className="text-sm text-charcoal-light">Winning</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection