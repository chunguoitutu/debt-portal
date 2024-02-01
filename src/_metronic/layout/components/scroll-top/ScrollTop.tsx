import {KTIcon} from '@/_metronic/helpers'

export function ScrollTop() {
  function scrollTop() {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }, 0)
  }

  return (
    <div id='kt_scrolltop' className='scrolltop' data-kt-scrolltop='true' onClick={scrollTop}>
      <KTIcon iconName='arrow-up' />
    </div>
  )
}
