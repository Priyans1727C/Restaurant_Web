import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import PropTypes from 'prop-types'

function DeliveryForm({ deliveryInfo, setDeliveryInfo, setStep }) {
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setDeliveryInfo(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    if (!deliveryInfo.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!deliveryInfo.address.trim()) newErrors.address = 'Address is required'
    if (!deliveryInfo.city.trim()) newErrors.city = 'City is required'
    if (!deliveryInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!deliveryInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setStep(2)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-serif text-2xl mb-6">Delivery Information</h2>
      
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-charcoal font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={deliveryInfo.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="block text-charcoal font-medium mb-2">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={deliveryInfo.address}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main St, Apt 4B"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="city" className="block text-charcoal font-medium mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={deliveryInfo.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-charcoal font-medium mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={deliveryInfo.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10001"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="phone" className="block text-charcoal font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={deliveryInfo.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="instructions" className="block text-charcoal font-medium mb-2">
          Delivery Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={deliveryInfo.instructions}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="E.g., Ring doorbell, leave at door, etc."
        />
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-100 text-charcoal rounded-md hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        
        <button
          type="submit"
          className="btn btn-primary flex items-center"
        >
          Continue to Payment
          <FaCheck className="ml-2" />
        </button>
      </div>
    </form>
  )
}

DeliveryForm.propTypes = {
  deliveryInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    instructions: PropTypes.string
  }).isRequired,
  setDeliveryInfo: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired
}

export default DeliveryForm