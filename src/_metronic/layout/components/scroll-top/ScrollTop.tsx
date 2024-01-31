import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {KTIcon} from '@/_metronic/helpers'

export function ScrollTop() {
  const {pathname} = useLocation()

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }, 0)
  }, [pathname])

  return (
    <div id='kt_scrolltop' className='scrolltop' data-kt-scrolltop='true'>
      <KTIcon iconName='arrow-up' />
    </div>
  )
}
