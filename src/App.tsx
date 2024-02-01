import {Suspense, useEffect, useState} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {LayoutSplashScreen} from './_metronic/layout/core'

const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)
  }, [pathname])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Outlet />
    </Suspense>
  )
}

export {App}
