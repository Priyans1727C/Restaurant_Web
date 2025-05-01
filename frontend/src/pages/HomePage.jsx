import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import FeaturedDishes from '../components/home/FeaturedDishes'
import AboutSection from '../components/home/AboutSection'
import Testimonials from '../components/home/Testimonials'
import ChefsSection from '../components/home/ChefsSection'
import ReservationSection from '../components/home/ReservationSection'

function HomePage() {
  useEffect(() => {
    // Update page title with new restaurant name
    document.title = 'Bitey | Extraordinary Culinary Experience'
    
    // Scroll to top on page load with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Clean up function to reset scroll behavior
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="homepage-container">
      <Hero />
      <FeaturedDishes />
      <AboutSection />
      <Testimonials />
      <ChefsSection />
      <ReservationSection />
    </div>
  )
}

export default HomePage