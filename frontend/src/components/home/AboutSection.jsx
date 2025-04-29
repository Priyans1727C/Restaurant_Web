import { motion } from 'framer-motion'

function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-56 h-56 hidden lg:block">
              <div className="w-full h-full rounded-lg bg-primary p-6 text-white flex flex-col justify-center">
                <p className="font-serif text-3xl mb-2">15+</p>
                <p className="text-sm">Years of culinary excellence and passionate service</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">A Passion for Exceptional Food & Service</h2>
            
            <p className="text-charcoal-light mb-6">
              Founded in 2010, Gourmet Table began with a simple mission: create a dining experience that celebrates the art of food while providing unmatched hospitality. Our journey started with Executive Chef Antonio Rossi's vision to blend traditional techniques with innovative approaches.
            </p>
            
            <p className="text-charcoal-light mb-8">
              We source only the finest ingredients from local farmers and sustainable providers. Every dish is crafted with precision and care, resulting in flavors that tell a story of tradition, innovation, and passion. Our dining room is designed to create an atmosphere of refined comfort, allowing you to focus on what matters most – exceptional food and great company.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <p className="font-serif text-2xl text-primary mb-1">Seasonal</p>
                <p className="text-sm text-charcoal-light">Ingredients</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <p className="font-serif text-2xl text-primary mb-1">Artisanal</p>
                <p className="text-sm text-charcoal-light">Approach</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <p className="font-serif text-2xl text-primary mb-1">Elegant</p>
                <p className="text-sm text-charcoal-light">Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection