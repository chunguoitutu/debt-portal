import './style.scss'
import {useEffect, useState} from 'react'
import {COMPONENT_LIST} from './config'

const Home = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
    window.innerWidth || document.documentElement.clientWidth
  )

  useEffect(() => {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight

    const handler = () => {
      const animationList = document.querySelectorAll('.home-animation')

      if (!animationList) return

      animationList.forEach((animation) => {
        const rect = animation.getBoundingClientRect()
        const isInViewport = !(rect.bottom < 0 || rect.top > screenHeight)

        if (isInViewport) {
          const isViewed = animation.classList.contains('viewed')
          !isViewed && animation.classList?.add('viewed')
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
    <div className='home'>
      {COMPONENT_LIST.map((el) => {
        const Component = el.component
        return <Component screenWidth={screenWidth} key={el.id} />
      })}
    </div>
  )
}

export default Home
