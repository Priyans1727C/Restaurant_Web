import { motion } from 'framer-motion'
import { FaLeaf, FaHandshake, FaHeart, FaUtensils } from 'react-icons/fa'

function AboutPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="bg-ivory pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-dark bg-opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Our Story</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              A culinary journey of passion, tradition and innovation
            </p>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Our History */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Chef cooking" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Legacy</span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">The Gourmet Table Journey</h2>
              
              <p className="text-charcoal mb-6">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Conti, Gourmet Table was born from a shared vision to create extraordinary dining experiences that celebrate the rich culinary traditions of Italy with modern, innovative techniques.
              </p>
              
              <p className="text-charcoal mb-6">
                What began as an intimate 30-seat restaurant in the heart of the city has grown into a culinary landmark known for its exceptional cuisine, warm hospitality, and dedication to sustainable practices.
              </p>
              
              <p className="text-charcoal mb-6">
                Over the years, we have remained true to our founding principles: source the finest local ingredients, prepare them with care and respect, and serve them in an atmosphere of refined comfort.
              </p>
              
              <div className="flex items-center mt-8">
                <img 
                  src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Chef Antonio" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div className="ml-4">
                  <p className="font-serif text-lg text-charcoal-dark">Antonio Rossi</p>
                  <p className="text-charcoal-light">Founder & Executive Chef</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">What Guides Us</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">Our Core Values</h2>
            <p className="text-charcoal-light">
              At Gourmet Table, these principles guide everything we do, from sourcing ingredients to serving our guests.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-ivory p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="text-primary text-2xl" />
              </div>
              <h3 className="font-serif text-xl mb-3">Sustainability</h3>
              <p className="text-charcoal-light">We&apos;re committed to environmentally responsible practices throughout our operations.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-ivory p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="text-primary text-2xl" />
              </div>
              <h3 className="font-serif text-xl mb-3">Community</h3>
              <p className="text-charcoal-light">We support local farmers and producers, building strong relationships in our community.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-ivory p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-primary text-2xl" />
              </div>
              <h3 className="font-serif text-xl mb-3">Passion</h3>
              <p className="text-charcoal-light">We bring love and dedication to every dish we prepare and every guest we serve.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-ivory p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUtensils className="text-primary text-2xl" />
              </div>
              <h3 className="font-serif text-xl mb-3">Excellence</h3>
              <p className="text-charcoal-light">We strive for perfection in our cuisine, service, and ambiance, never compromising on quality.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">The Faces Behind The Flavors</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">Meet Our Team</h2>
            <p className="text-charcoal-light">
              Our talented and passionate team works tirelessly to create unforgettable experiences for our guests.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                name: "Antonio Rossi",
                title: "Executive Chef",
                image: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "With over 20 years of experience in fine dining, Chef Antonio brings his passion for Italian cuisine and innovative techniques to every dish."
              },
              {
                name: "Sofia Martinez",
                title: "Head Chef",
                image: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "A graduate of Le Cordon Bleu, Sofia specializes in creating seasonal menus that showcase the best local ingredients."
              },
              {
                name: "Marco Chen",
                title: "Pastry Chef",
                image: "https://images.pexels.com/photos/8477767/pexels-photo-8477767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                bio: "Marco&apos;s innovative dessert creations blend traditional techniques with modern presentation for an unforgettable final course."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-charcoal-light">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2 mb-6">Key Milestones</h2>
            <p className="text-gray-300">
              Celebrating the defining moments in our restaurant&apos;s history.
            </p>
          </motion.div>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            {[
              {
                year: "2010",
                title: "Grand Opening",
                description: "Gourmet Table opens its doors as a small 30-seat restaurant in the city center."
              },
              {
                year: "2013",
                title: "First Michelin Star",
                description: "Our dedication to excellence is recognized with our first Michelin star."
              },
              {
                year: "2016",
                title: "Expansion",
                description: "We move to our current location, tripling our capacity and adding a private dining room."
              },
              {
                year: "2019",
                title: "Sustainability Award",
                description: "Recognized for our commitment to sustainable practices and local sourcing."
              },
              {
                year: "2023",
                title: "Second Michelin Star",
                description: "Our continued innovation and culinary excellence earns us a second Michelin star."
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-start gap-8"
              >
                <div className="md:w-1/6">
                  <div className="bg-accent text-charcoal-dark font-serif text-2xl font-bold py-4 px-6 rounded-md text-center">
                    {milestone.year}
                  </div>
                </div>
                <div className="md:w-5/6 border-l-2 border-accent pl-8 pb-8">
                  <h3 className="font-serif text-2xl mb-3">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage