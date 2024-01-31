import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {MasterInit} from './_metronic/layout/MasterInit'
import {LayoutSplashScreen} from './_metronic/layout/core'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Outlet />
      <MasterInit />
    </Suspense>
  )
}

export {App}
