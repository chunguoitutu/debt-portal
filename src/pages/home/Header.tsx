import Button from '@/components/button/Button'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import LoginForm from './LoginForm'
import dashboardImg from '@/app/images/dashboard.png'
import {FC} from 'react'
import clsx from 'clsx'
import {HomeProps} from '@/app/types'

const HomeHeader: FC<HomeProps> = (props) => {
  const {screenWidth} = props

  return (
    <section
      className='dashboard-header py-120px'
      style={{
        background: `url('${dashboardImg}') no-repeat center center / cover`,
      }}
    >
      <div className='container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-60px'>
        <div
          className={clsx(['d-flex flex-column gap-24px mw-500px', screenWidth < 992 && 'order-2'])}
        >
          <div className={clsx(['home-animation fade bot-to-top'])}>
            <span className='d-inline-flex align-items-center gap-16px text-white mb-16px fs-24 fw-semibold'>
              Welcome To <span className='d-none d-sm-inline-block w-60px h-1px bg-white'></span>
            </span>

            <h2 className='company_name fs-66 text-white fw-bolder m-0 lh-scale-1'>FINANCE 360</h2>
            <h3 className='organization_name fs-44 text-primary fw-bolder m-0 lh-scale-1-5'>
              MCK DYNAMICS.
            </h3>
          </div>

          <span
            className={clsx(
              'fs-20 text-white fw-semibold home-animation fade bot-to-top delay-0-3'
            )}
          >
            “ With our eyes on the long-term future, we invest in tomorrow knowing that we can make
            a difference today.”
          </span>

          <Button
            className={clsx([
              'btn-primary w-fit-content py-12px px-20px home-animation fade bot-to-top delay-0-4',
            ])}
            iconRight={faChevronRight}
            classNameIcon='fs-12'
          >
            Create Application
          </Button>
        </div>

        <LoginForm {...props} />
      </div>
    </section>
  )
}

export default HomeHeader
