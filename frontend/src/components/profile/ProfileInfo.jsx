import { useState } from 'react'
import { FaUser, FaEdit, FaCheck } from 'react-icons/fa'
import { useAuth } from '../../context/authUtils'

function ProfileInfo() {
  const { currentUser, updateProfile } = useAuth()
  
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setEditing(false)
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl">Personal Information</h2>
        
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center text-sm text-secondary hover:text-secondary-dark transition-colors"
          >
            <FaCheck className="mr-1" />
            Save
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-24 h-24 rounded-full bg-ivory-dark flex items-center justify-center text-primary border border-gray-200">
          <FaUser className="text-4xl" />
        </div>
        
        {/* Profile Information */}
        {!editing ? (
          <div className="flex-grow space-y-4">
            <div>
              <h3 className="text-sm text-charcoal-light">Name</h3>
              <p className="font-medium">{currentUser?.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-charcoal-light">Email</h3>
              <p className="font-medium">{currentUser?.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-charcoal-light">Phone</h3>
              <p className="font-medium">{currentUser?.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-charcoal-light">Address</h3>
              <p className="font-medium">{currentUser?.address || 'Not provided'}</p>
            </div>
          </div>
        ) : (
          <form className="flex-grow space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm text-charcoal-light mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-charcoal-light mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm text-charcoal-light mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm text-charcoal-light mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo