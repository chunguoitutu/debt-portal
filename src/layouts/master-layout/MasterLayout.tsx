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
      <main className={clsx([`d-flex flex-column  ${scroll && 'overflow-hidden'}`])}>
        <div>
          <Header setSCroll={setSCroll} scroll={scroll} />
          <div className='mt-90px min-height-main-container'>{true && <Outlet />}</div>
        </div>
        <Footer />
      </main>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
