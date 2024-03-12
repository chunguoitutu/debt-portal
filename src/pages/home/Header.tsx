import Button from '@/components/button/Button'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import LoginForm from './LoginForm'
import dashboardImg from '@/app/images/dashboard.png'
import {FC} from 'react'
import clsx from 'clsx'
import {HomeProps} from '@/app/types'
import Cookies from 'js-cookie'
import {useShared} from '@/app/context/SharedContext'

const HomeHeader: FC<HomeProps> = (props) => {
  const {screenWidth} = props
  const {showLoginForm, setShowLoginForm} = useShared()
  const token = Cookies.get('token')

  function toggleFormLogin() {
    if (!showLoginForm) {
      window?.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }
    setShowLoginForm(!showLoginForm)
  }

  return (
    <section
      className={clsx(['dashboard-header d-flex align-items-center'])}
      style={{
        background: `url('${dashboardImg}') no-repeat center center / cover`,
      }}
    >
      <div className='wrapper d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-66px'>
        <div className={clsx([`${!!showLoginForm ? 'd-none d-lg-block' : ''} `])}>
          <div
            className={clsx([
              `d-flex flex-column gap-16px gap-lg-24px mw-700px  `,
              screenWidth < 992 && 'order-2',
            ])}
          >
            <div className={clsx(['home-animation fade bot-to-top'])}>
              <span className='welcome d-inline-flex align-items-center gap-16px text-white mb-8px mb-lg-16px fs-24 fw-semibold'>
                Welcome To <span className='w-60px h-1px bg-white'></span>
              </span>

              <h2 className='company_name fs-66 text-white  fw-bolder m-0 lh-1'>FIELD SERVICE</h2>
              <h3 className='organization_name fs-44 text-primary fw-bolder m-0 lh-1-5'>
                FOR DEBT COLLECTOR.
              </h3>
            </div>

            <p
              className={clsx(
                'content fs-20 text-white fw-semibold home-animation fade bot-to-top m-0 delay-0-3'
              )}
            >
              Field service for debt collectors application owned by Finance 360 MCK Group
            </p>

            <Button
              className={clsx([
                'btn-primary w-fit-content py-12px px-20px home-animation fade bot-to-top delay-0-4',
              ])}
              iconRight={faChevronRight}
              classNameIcon='fs-12'
              onClick={toggleFormLogin}
            >
              Sign In
            </Button>
          </div>
        </div>

        {!token && <LoginForm {...props} />}
      </div>
    </section>
  )
}

export default HomeHeader
