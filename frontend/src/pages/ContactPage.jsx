import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message. We will contact you shortly!'
    })
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }
  
  return (
    <div className="bg-ivory pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Restaurant table setting" 
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              We&apos;d love to hear from you
            </p>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="font-serif text-2xl md:text-3xl mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaPhone className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Phone</h3>
                      <p className="text-charcoal-light">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email</h3>
                      <p className="text-charcoal-light">info@gourmettable.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Location</h3>
                      <p className="text-charcoal-light">123 Gourmet Avenue<br />Culinary District<br />Foodie City, FC 54321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <FaClock className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Hours</h3>
                      <p className="text-charcoal-light">
                        Monday - Thursday: 5:00 PM - 10:00 PM<br />
                        Friday - Saturday: 5:00 PM - 11:00 PM<br />
                        Sunday: 11:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-lg mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-primary hover:bg-primary-dark transition-colors duration-300 text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <FaInstagram />
                    </a>
                    <a href="#" className="bg-primary hover:bg-primary-dark transition-colors duration-300 text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="bg-primary hover:bg-primary-dark transition-colors duration-300 text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="font-serif text-2xl md:text-3xl mb-6">Send Us a Message</h2>
                
                {formStatus.submitted && formStatus.success ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                    <p>{formStatus.message}</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-charcoal-light mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-charcoal-light mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-charcoal-light mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-charcoal-light mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-charcoal-light mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary inline-flex items-center"
                    >
                      Send Message
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-96 w-full">
              {/* Placeholder for an actual Google Maps embed */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <FaMapMarkerAlt className="text-primary text-4xl mx-auto mb-4" />
                  <p className="text-charcoal-dark font-medium">Map placeholder - In a real application, this would be a Google Maps embed</p>
                  <p className="text-charcoal-light mt-2">123 Gourmet Avenue, Culinary District, Foodie City, FC 54321</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Reservation CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Make a Reservation</h2>
            <p className="text-lg opacity-90 mb-8">
              Reserve your table today and experience our exquisite cuisine in an elegant atmosphere.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="tel:+15551234567" className="btn bg-white text-primary hover:bg-gray-100 flex items-center justify-center">
                <FaPhone className="mr-2" />
                Call Now: (555) 123-4567
              </a>
              <a href="#" className="btn bg-accent text-charcoal-dark hover:bg-accent-dark">
                Book Online
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage