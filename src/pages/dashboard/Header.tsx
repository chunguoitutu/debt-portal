import Button from '@/components/button/Button'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import LoginForm from './LoginForm'
import dashboardImg from '@/app/images/dashboard.png'
import {FC} from 'react'
import clsx from 'clsx'
import {DashboardProps} from '@/app/types'

const DashboardHeader: FC<DashboardProps> = () => {
  return (
    <section
      className='dashboard-block dashboard-header py-120px'
      style={{
        background: `url('${dashboardImg}') no-repeat center center / cover`,
      }}
    >
      <div className='container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-60px'>
        <div className='d-flex flex-column gap-24px mw-600px'>
          <div className={clsx(['dashboard-animation fade bot-to-top'])}>
            <span className='d-inline-flex align-items-center gap-16px text-white mb-16px fs-16'>
              Welcome To <span className='d-inline-block w-60px h-1px bg-white'></span>
            </span>

            <h2 className='fs-66 text-white fw-bolder m-0 lh-scale-1'>FINANCE 360</h2>
            <h3 className='fs-44 text-primary fw-bolder m-0 lh-scale-1-5'>MCK DYNAMICS.</h3>
          </div>

          <span
            className={clsx(
              'fs-20 text-white text-capitalize dashboard-animation fade bot-to-top delay-0-3'
            )}
          >
            “ With our eyes on the long-term future, we invest in tomorrow knowing that we can make
            a difference today.”
          </span>

          <Button
            className={clsx([
              'btn-primary w-fit-content py-12px px-20px dashboard-animation fade bot-to-top delay-0-4',
            ])}
            iconRight={faChevronRight}
            classNameIcon='fs-12'
          >
            Create Application
          </Button>
        </div>

        <LoginForm />
      </div>
    </section>
  )
}

export default DashboardHeader
