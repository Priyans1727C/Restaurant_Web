import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp, FaRupeeSign } from 'react-icons/fa'
import { useAuth } from '../../context/authUtils'

function OrderHistory() {
  const { currentUser } = useAuth()
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }
  
  // If no orders, show message
  if (!currentUser?.orders || currentUser.orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-2xl mb-6">Order History</h2>
        <div className="text-center py-8">
          <p className="text-charcoal-light">You haven&apos;t placed any orders yet.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-serif text-2xl mb-6">Order History</h2>
      
      <div className="space-y-4">
        {currentUser.orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-ivory-dark transition-colors"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-charcoal-light">{order.date}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-primary flex items-center justify-end">
                    <FaRupeeSign className="text-xs mr-1" />
                    {parseInt(order.total)}
                  </p>
                  <p className={`text-sm ${
                    order.status === 'Delivered' ? 'text-secondary' : 
                    order.status === 'Cancelled' ? 'text-red-500' : 'text-accent-dark'
                  }`}>
                    {order.status}
                  </p>
                </div>
                
                {expandedOrderId === order.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            
            <AnimatePresence>
              {expandedOrderId === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-gray-200"
                >
                  <div className="p-4 bg-ivory-dark">
                    <h3 className="font-medium mb-2">Order Details</h3>
                    
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.quantity}x</span> {item.name}
                          </div>
                          <span className="flex items-center">
                            <FaRupeeSign className="text-xs mr-1" />
                            {parseInt(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-300 pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="flex items-center">
                        <FaRupeeSign className="text-xs mr-1" />
                        {parseInt(order.total)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory