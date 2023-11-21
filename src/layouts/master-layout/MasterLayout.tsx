import {useEffect, useMemo} from 'react'
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {HeaderWrapper} from '../../_metronic/layout/components/header'
import {ScrollTop} from '../../_metronic/layout/components/scroll-top'
import {FooterWrapper} from '../../_metronic/layout/components/footer'
import {Sidebar} from '../../_metronic/layout/components/sidebar'
import {ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan} from '../../_metronic/partials'
import {PageDataProvider} from '../../_metronic/layout/core'
import {reInitMenu} from '../../_metronic/helpers'
import {ToolbarWrapper} from '../../_metronic/layout/components/toolbar'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {useAuth} from '../../app/context/AuthContext'
import clsx from 'clsx'
import {swalToast} from 'src/app/swal-notification'

interface iJwtDecode {
  iat: number
  exp?: string
}

const MasterLayout = () => {
  const location = useLocation()

  const {logout, refreshToken} = useAuth()

  const navigate = useNavigate()
  const {pathname} = useLocation()

  const token = Cookies.get('token')

  useEffect(() => {
    // Avoid crashes app if token is invalid
    try {
      const {exp} = jwtDecode<iJwtDecode>(token || '')

      const isTokenExpired = exp ? Number(exp) < Date.now() / 1000 : false

      // handle token expired
      if (isTokenExpired) {
        const arrayReject = ['config', 'profile']
        //E.g: pathname "/abc" should be return "redirect=abc"
        const query = pathname.split('/').some((item) => !arrayReject.includes(item))
          ? `redirect=${pathname.slice(1)}`
          : ''

        Cookies.remove('token')
        navigate(`/login?${query}`)
        swalToast.fire({
          icon: 'error',
          title: 'Login session has expired.',
        })
      } else {
        // Get info when reload
        token && refreshToken(token)
      }
    } catch (error) {
      logout()
    }
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
