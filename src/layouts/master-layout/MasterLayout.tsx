import {useEffect, useMemo} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import clsx from 'clsx'
import {useAuth} from 'src/app/context/AuthContext'
import {reInitMenu} from 'src/_metronic/helpers'
import {PageDataProvider} from 'src/_metronic/layout/core'
import {HeaderWrapper} from 'src/_metronic/layout/components/header'
import {Sidebar} from 'src/_metronic/layout/components/sidebar'
import {ToolbarWrapper} from 'src/_metronic/layout/components/toolbar'
import {FooterWrapper} from 'src/_metronic/layout/components/footer'
import {ScrollTop} from 'src/_metronic/layout/components/scroll-top'
import {ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan} from 'src/_metronic/partials'

const MasterLayout = () => {
  const location = useLocation()

  const {refreshToken} = useAuth()

  const {pathname} = useLocation()

  const token = Cookies.get('token')

  useEffect(() => {
    if (!token) return
    refreshToken(token || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    reInitMenu()
  }, [location.key])

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
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      <ActivityDrawer />
      <DrawerMessenger />

      <InviteUsers />
      <UpgradePlan />
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
