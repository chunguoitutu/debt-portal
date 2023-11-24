import {useEffect, useMemo} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import clsx from 'clsx'
import {FooterWrapper} from '@/components/footer'
import {useAuth} from '@/app/context/AuthContext'
import {PageDataProvider} from '@/_metronic/layout/core'
import {HeaderWrapper} from '@/_metronic/layout/components/header'
import {Sidebar} from '@/_metronic/layout/components/sidebar'
import {ToolbarWrapper} from '@/_metronic/layout/components/toolbar'
import {ScrollTop} from '@/_metronic/layout/components/scroll-top'

const MasterLayout = () => {
  const {refreshToken} = useAuth()

  const {pathname} = useLocation()

  const token = Cookies.get('token')

  useEffect(() => {
    if (!token) return
    refreshToken(token || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const isViewHeight = useMemo(() => {
    const arrCheck = ['loans', 'application/create', 'application/edit']
    return arrCheck.some((el) => pathname.includes(el))
  }, [pathname])

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <PageDataProvider>
      <div
        className={clsx([
          'd-flex flex-column flex-root app-root min-vh-100',
          isViewHeight && 'app-root-view-height vh-100',
        ])}
        id='kt_app_root'
      >
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div
                className={clsx([
                  'd-flex flex-column flex-column-fluid app-container flex-grow-1',
                  isViewHeight && 'app-main-content',
                ])}
              >
                <ToolbarWrapper />
                <Outlet />
              </div>
              <FooterWrapper className='py-5' />
            </div>
          </div>
        </div>
      </div>

      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
