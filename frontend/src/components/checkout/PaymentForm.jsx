import { useState } from 'react'
import { FaCreditCard, FaPaypal, FaApplePay, FaGoogle, FaLock, FaArrowLeft } from 'react-icons/fa'

function PaymentForm({ paymentInfo, setPaymentInfo, setStep, handlePlaceOrder }) {
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const handleMethodChange = (method) => {
    setPaymentInfo(prev => ({ ...prev, method }))
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (paymentInfo.method === 'creditCard') {
      if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required'
      if (!paymentInfo.cardName) newErrors.cardName = 'Name on card is required'
      if (!paymentInfo.expDate) newErrors.expDate = 'Expiration date is required'
      if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      handlePlaceOrder()
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
            paymentInfo.method === 'creditCard'
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodChange('creditCard')}
        >
          <FaCreditCard className="mx-auto text-2xl mb-2" />
          <span className="block text-sm">Credit Card</span>
        </div>
        
        <div
          className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
            paymentInfo.method === 'paypal'
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodChange('paypal')}
        >
          <FaPaypal className="mx-auto text-2xl mb-2" />
          <span className="block text-sm">PayPal</span>
        </div>
        
        <div
          className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
            paymentInfo.method === 'applePay'
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodChange('applePay')}
        >
          <FaApplePay className="mx-auto text-2xl mb-2" />
          <span className="block text-sm">Apple Pay</span>
        </div>
        
        <div
          className={`border rounded-md p-4 text-center cursor-pointer transition-colors ${
            paymentInfo.method === 'googlePay'
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleMethodChange('googlePay')}
        >
          <FaGoogle className="mx-auto text-2xl mb-2" />
          <span className="block text-sm">Google Pay</span>
        </div>
      </div>
      
      {paymentInfo.method === 'creditCard' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-charcoal font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cardName" className="block text-charcoal font-medium mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={paymentInfo.cardName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expDate" className="block text-charcoal font-medium mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                id="expDate"
                name="expDate"
                value={paymentInfo.expDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.expDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
              />
              {errors.expDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-charcoal font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {(paymentInfo.method === 'paypal' || paymentInfo.method === 'applePay' || paymentInfo.method === 'googlePay') && (
        <div className="text-center py-6">
          <p className="text-charcoal-light mb-4">
            You will be redirected to {
              paymentInfo.method === 'paypal' ? 'PayPal' :
              paymentInfo.method === 'applePay' ? 'Apple Pay' : 'Google Pay'
            } to complete your payment.
          </p>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center mb-6">
          <FaLock className="text-secondary mr-2" />
          <span className="text-sm text-charcoal-light">Your payment information is secure and encrypted</span>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-6 py-3 bg-gray-100 text-charcoal rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  )
}

export default PaymentForm