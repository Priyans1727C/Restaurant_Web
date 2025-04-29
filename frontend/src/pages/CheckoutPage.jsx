import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import DeliveryForm from '../components/checkout/DeliveryForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderSuccess from '../components/checkout/OrderSuccess'

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  
  // Checkout steps: 1 = delivery info, 2 = payment, 3 = success
  const [step, setStep] = useState(1)
  
  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    instructions: ''
  })
  
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'creditCard',
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: ''
  })
  
  // Order success information
  const [orderInfo, setOrderInfo] = useState({
    id: '',
    estimatedDelivery: '',
    address: '',
    total: 0
  })
  
  useEffect(() => {
    // Update page title
    document.title = 'Checkout | Gourmet Table'
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])
  
  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      window.location.href = '/cart'
    }
  }, [cart, step])
  
  // Calculate order totals
  const tax = totalPrice * 0.08 // 8% tax
  const deliveryFee = 5.99
  const finalTotal = totalPrice + tax + deliveryFee
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit order data to a server
    // For demo purposes, we'll create mock order information
    
    // Generate random order ID
    const orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    
    // Calculate estimated delivery time (30-45 min from now)
    const now = new Date()
    const deliveryTime = new Date(now.getTime() + (30 + Math.floor(Math.random() * 15)) * 60000)
    const timeString = deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    // Set order info
    setOrderInfo({
      id: orderId,
      estimatedDelivery: timeString,
      address: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.zipCode}`,
      total: finalTotal
    })
    
    // Clear cart and proceed to success step
    clearCart()
    setStep(3)
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-ivory-dark">
      <div className="container mx-auto px-4">
        {step !== 3 && (
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to Cart
            </Link>
          </div>
        )}
        
        {step !== 3 && (
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className={`text-center w-8 ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>Delivery</div>
                <div className={`text-center w-8 ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>Payment</div>
                <div className={`text-center w-8 ${step >= 3 ? 'text-primary' : 'text-gray-500'}`}>Confirmation</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {step !== 3 ? (
            <>
              {/* Main Content */}
              <div className="flex-grow">
                {step === 1 && (
                  <DeliveryForm
                    deliveryInfo={deliveryInfo}
                    setDeliveryInfo={setDeliveryInfo}
                    setStep={setStep}
                  />
                )}
                
                {step === 2 && (
                  <PaymentForm
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    setStep={setStep}
                    handlePlaceOrder={handlePlaceOrder}
                  />
                )}
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x</span> {item.name}
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-charcoal-light">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-light">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-light">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <OrderSuccess orderInfo={orderInfo} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage