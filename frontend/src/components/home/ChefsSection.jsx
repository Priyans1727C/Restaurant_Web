import { motion } from 'framer-motion'
import { chefs } from '../../utils/mockData'
import { FaUtensils } from 'react-icons/fa'

function ChefsSection() {
  return (
    <section className="section-padding bg-ivory py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <FaUtensils className="text-primary text-xl inline-block" />
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Culinary Artists</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Meet the talented chefs behind every memorable bite at Bitey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {chefs.map((chef, index) => (
            <motion.div 
              key={chef.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-center md:items-start group"
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg transform transition-transform group-hover:scale-105">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:pt-4">
                <h3 className="font-serif text-2xl font-bold mb-2 text-center md:text-left">{chef.name}</h3>
                <div className="inline-block bg-primary/10 px-3 py-1 rounded-full mb-4 text-primary font-medium text-center md:text-left">{chef.title}</div>
                <p className="text-charcoal-light text-lg">{chef.bio}</p>
                <div className="mt-4 border-t border-dashed border-gray-200 pt-3">
                  <p className="text-primary font-medium">Specialty: {index === 0 ? "Modern Italian Fusion" : "French Pastry Arts"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChefsSection