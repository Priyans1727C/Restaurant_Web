import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaHome, FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'

function OrderSuccess({ orderInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto"
    >
      <FaCheckCircle className="text-6xl text-secondary mx-auto mb-6" />
      
      <h2 className="font-serif text-3xl mb-4">Order Placed Successfully!</h2>
      
      <p className="text-charcoal-light mb-6">
        Thank you for your order. Your delicious food is being prepared and will be on its way soon.
      </p>
      
      <div className="bg-ivory-dark p-6 rounded-lg mb-8">
        <h3 className="font-serif text-xl mb-4">Order Details</h3>
        
        <div className="text-left space-y-2 mb-4">
          <p><span className="font-medium">Order ID:</span> #{orderInfo.id}</p>
          <p><span className="font-medium">Estimated Delivery:</span> {orderInfo.estimatedDelivery}</p>
          <p><span className="font-medium">Delivery Address:</span> {orderInfo.address}</p>
        </div>
        
        <div className="border-t border-gray-300 pt-4">
          <p className="font-medium">Order Total: <span className="text-primary">${orderInfo.total.toFixed(2)}</span></p>
        </div>
      </div>
      
      <p className="text-charcoal-light mb-8">
        We&apos;ve sent a confirmation email with all the details to your email address.
        You can also check your order status in your profile.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn bg-ivory border border-primary text-primary hover:bg-ivory-dark flex items-center justify-center">
          <FaHome className="mr-2" />
          Return Home
        </Link>
        <Link to="/profile" className="btn btn-primary flex items-center justify-center">
          <FaUser className="mr-2" />
          View Profile
        </Link>
      </div>
    </motion.div>
  )
}

OrderSuccess.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    estimatedDelivery: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
}

export default OrderSuccess