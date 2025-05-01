import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt } from 'react-icons/fa'

function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to a server
    console.log('Reservation details:', formData)
    setIsSubmitted(true)
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: ''
      })
    }, 5000)
  }
  
  return (
    <section id="book-table" className="section-padding bg-white py-24 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/20 rounded-bl-full transform rotate-12"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/15 rounded-tr-full"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary/10 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-accent/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <FaCalendarAlt className="text-primary text-xl inline-block" />
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Reserve Your Table</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
            Book your spot at Bitey and enjoy an unforgettable dining experience with personalized service
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/10 border border-secondary rounded-xl p-8 text-center"
            >
              <h3 className="text-2xl font-serif text-secondary mb-2">Thank You!</h3>
              <p className="text-charcoal text-lg">
                Your reservation request has been received. We&apos;ll confirm your booking shortly via email or phone.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit} 
              className="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-charcoal font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-charcoal font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-charcoal font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-charcoal font-medium mb-2">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-charcoal font-medium mb-2">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-charcoal font-medium mb-2">Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                    <option value="more">More than 10</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="message" className="block text-charcoal font-medium mb-2">Special Requests (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Please let us know if you have any special requests or dietary requirements."
                ></textarea>
              </div>
              
              <div className="mt-8 text-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="btn btn-primary min-w-48 rounded-full px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Reserve Now
                </motion.button>
                <p className="text-sm text-charcoal-light mt-4">
                  By booking a table, you agree to our reservation policy. We hold reservations for 15 minutes past the booking time.
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReservationSection