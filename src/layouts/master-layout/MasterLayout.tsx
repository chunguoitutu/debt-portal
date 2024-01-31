import {useEffect} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import clsx from 'clsx'
import {useAuth} from '@/app/context/AuthContext'
import {PageDataProvider} from '@/_metronic/layout/core'
import {ScrollTop} from '@/_metronic/layout/components/scroll-top'
import Footer from '@/components/footer'
import Header from '@/components/header'

const MasterLayout = () => {
  // const {refreshToken} = useAuth()

  // const {pathname} = useLocation()
  const navigate = useNavigate()

  // const token = Cookies.get('token')

  // useEffect(() => {
  //   if (!token) return navigate('/login')

  //   refreshToken(token || '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname, token])

  return (
    <PageDataProvider>
      <main className={clsx(['d-flex flex-column min-h-100vh'])}>
        <Header />
        <div className='mt-90px'>{true && <Outlet />}</div>
        <Footer />
      </main>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
