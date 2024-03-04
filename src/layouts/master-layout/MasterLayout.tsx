import {Outlet, useLocation, useNavigate} from 'react-router-dom'

import Footer from '@/components/footer'
import Header from '@/components/header'
import {PageDataProvider} from '@/components/breadcrumbs'
import {ScrollTop} from '@/_metronic/layout/components/scroll-top'
import clsx from 'clsx'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useAuth} from '@/app/context/AuthContext'

const MasterLayout = () => {
  const [scroll, setSCroll] = useState(false)
  const {pathname} = useLocation()
  const [page, setPage] = useState(false)
  // const {refreshToken} = useAuth()

  // const {pathname} = useLocation()
  const navigate = useNavigate()

  const token = Cookies.get('token')

  useEffect(() => {
    setPage(false)
    if (!token) {
      navigate('/login')
    }
    setPage(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('token'), pathname])

  return (
    <>
      {page && (
        <PageDataProvider>
          <main className={clsx([`d-flex flex-column min-vh-100 ${scroll && 'overflow-hidden'}`])}>
            <div className='d-flex flex-column flex-grow-1'>
              <Header setSCroll={setSCroll} scroll={scroll} />
              <div className='mt-85px h-100'>{true && <Outlet />}</div>
            </div>
            {/* <Footer /> */}
          </main>
          <ScrollTop />
        </PageDataProvider>
      )}
    </>
  )
}

export {MasterLayout}
