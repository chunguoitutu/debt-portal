import {Outlet, useNavigate} from 'react-router-dom'

import Footer from '@/components/footer'
import Header from '@/components/header'
import {PageDataProvider} from '@/components/breadcrumbs'
import {ScrollTop} from '@/_metronic/layout/components/scroll-top'
import clsx from 'clsx'
import {useState} from 'react'

const MasterLayout = () => {
  const [scroll, setSCroll] = useState(false)
  // const {refreshToken} = useAuth()

  // const {pathname} = useLocation()
  // const navigate = useNavigate()

  // const token = Cookies.get('token')

  // useEffect(() => {
  //   if (!token) return navigate('/login')

  //   refreshToken(token || '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname, token])'

  return (
    <PageDataProvider>
      <main className={clsx([`d-flex flex-column min-vh-100 ${scroll && 'overflow-hidden'}`])}>
        <div className='d-flex flex-column flex-grow-1'>
          <Header setSCroll={setSCroll} scroll={scroll} />
          <div className='mt-85px'>{true && <Outlet />}</div>
        </div>
        <Footer />
      </main>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
