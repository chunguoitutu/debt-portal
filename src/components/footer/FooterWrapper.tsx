import clsx from 'clsx'
import {useLayout} from '../../_metronic/layout/core'
import {Footer} from './Footer'
import {FC} from 'react'

type Props = {
  className?: string
}

const FooterWrapper: FC<Props> = ({className}) => {
  const {config} = useLayout()
  if (!config.app?.footer?.display) {
    return null
  }

  return (
    <div className='app-footer h-fit-content' id='kt_app_footer'>
      {config.app.footer.containerClass ? (
        <div
          className={clsx(
            'app-container justify-content-center text-center',
            config.app.footer.container === 'fixed' ? 'container-xxl' : 'container-fluid',
            className
          )}
        >
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  )
}

export {FooterWrapper}
