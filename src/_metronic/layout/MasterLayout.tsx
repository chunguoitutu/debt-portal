import {useEffect} from 'react'
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan} from '../partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {ToolbarWrapper} from './components/toolbar'
import {useAuth} from '../../app/modules/auth'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

interface iJwtDecode {
  iat: number
  exp?: string
}

const MasterLayout = () => {
  const location = useLocation()

  const {currentUser, logout} = useAuth()

  const navigate = useNavigate()
  const {pathname} = useLocation()

  const token = Cookies.get('token')

  useEffect(() => {
    // Avoid crashes app if token is invalid
    try {
      const {exp} = jwtDecode<iJwtDecode>(token || '')
      if (!exp) return

      const isTokenExpired = Number(exp) < Date.now() / 1000

      // handle token expired
      if (isTokenExpired) {
        const arrayReject = ['config', 'profile']
        //E.g: pathname "/abc" should be return "redirect=abc"
        const query = pathname.split('/').some((item) => !arrayReject.includes(item))
          ? `redirect=${pathname.slice(1)}`
          : ''

        navigate(`/login${query}`)
      } else {
        console.log(currentUser)
      }
    } catch (error) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    reInitMenu()
  }, [location.key])

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid'>
                <ToolbarWrapper />
                <Content>
                  <Outlet />
                </Content>
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
