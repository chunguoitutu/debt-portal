import './style.scss'
import Introduce from './Introduce'
import FinancialInstitutions from './FinancialInstitutions'
import Team from './Team'
import AboutUs from './AboutUs'
import DashboardHeader from './Header'
import Footer from '@/components/footer'
import Header from '@/components/header'
import {useEffect, useState} from 'react'

const Home = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    window.innerWidth || document.documentElement.clientWidth
  )

  useEffect(() => {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight

    const handler = () => {
      const animationList = document.querySelectorAll('.dashboard-animation')

      if (!animationList) return

      animationList.forEach((animation) => {
        const rect = animation.getBoundingClientRect()
        const isInViewport = !(rect.bottom < 0 || rect.top > screenHeight)

        if (isInViewport) {
          const isViewed = animation.classList.contains('show')
          !isViewed && animation.classList?.add('show')
        }
      })
    }

    // Handle the element already in the view. (no scroll)
    const timer = setTimeout(() => {
      handler()
    }, 350)

    window.addEventListener('scroll', handler)

    return () => {
      window.removeEventListener('scroll', handler)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth || document.documentElement.clientWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='dashboard'>
      <DashboardHeader screenWidth={screenWidth} />
      <Introduce screenWidth={screenWidth} />
      <FinancialInstitutions screenWidth={screenWidth} />
      <Team screenWidth={screenWidth} />
      <AboutUs screenWidth={screenWidth} />
    </div>
  )
}

export default Home
