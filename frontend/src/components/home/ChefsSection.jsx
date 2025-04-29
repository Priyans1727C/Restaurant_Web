import { motion } from 'framer-motion'
import { chefs } from '../../utils/mockData'

function ChefsSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Meet Our Chefs</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            The culinary artists behind every delicious dish at Gourmet Table.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {chefs.map((chef, index) => (
            <motion.div 
              key={chef.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row gap-6 items-center md:items-start"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="font-serif text-2xl mb-1 text-center md:text-left">{chef.name}</h3>
                <p className="text-primary mb-3 text-center md:text-left">{chef.title}</p>
                <p className="text-charcoal-light">{chef.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChefsSection