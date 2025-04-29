import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import ProfileInfo from '../components/profile/ProfileInfo'
import OrderHistory from '../components/profile/OrderHistory'

function ProfilePage() {
  const { currentUser, logout } = useAuth()
  
  useEffect(() => {
    // Update page title
    document.title = 'My Profile | Gourmet Table'
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])
  
  // For demo purposes, login a user if not already logged in
  useEffect(() => {
    if (!currentUser) {
      // In a real app, you would redirect to login page
      // Here we'll auto-login with demo data
      // login('demo@example.com', 'password')
    }
  }, [currentUser])
  
  if (!currentUser) {
    // For demo purposes, we'll show a simple login prompt
    // In a real app, this would be a full login page
    return (
      <div className="pt-24 pb-16 min-h-screen bg-ivory-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="font-serif text-2xl mb-6 text-center">Sign In</h1>
            
            <form className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-charcoal font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="demo@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-charcoal font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  defaultValue="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-primary w-full"
              >
                Sign In
              </button>
            </form>
            
            <p className="text-center text-charcoal-light">
              Don't have an account? <a href="#" className="text-primary">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-ivory-dark">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">My Profile</h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <ProfileInfo />
          <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage