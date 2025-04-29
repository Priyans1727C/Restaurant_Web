import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import FeaturedDishes from '../components/home/FeaturedDishes'
import AboutSection from '../components/home/AboutSection'
import Testimonials from '../components/home/Testimonials'
import ChefsSection from '../components/home/ChefsSection'
import ReservationSection from '../components/home/ReservationSection'

function HomePage() {
  useEffect(() => {
    // Update page title
    document.title = 'Gourmet Table | Exceptional Dining Experience'
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <FeaturedDishes />
      <AboutSection />
      <Testimonials />
      <ChefsSection />
      <ReservationSection />
    </>
  )
}

export default HomePage