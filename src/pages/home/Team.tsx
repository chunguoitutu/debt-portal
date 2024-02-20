import dashboardImg from '@/app/images/dashboard-team.png'
import {HomeProps} from '@/app/types'
import {FC} from 'react'

const Team: FC<HomeProps> = () => {
  return (
    <section
      className='team py-140px py-lg-200px py-2xl-212px'
      style={{
        background: `url('${dashboardImg}') no-repeat center center / cover`,
      }}
    >
      <div className='wrapper d-flex flex-column gap-60px'>
        <header className='text-center home-animation fade bot-to-top'>
          <h2 className='text-white fs-46 home__title mb-4px two-line'>
            At MCK, Perfection in Everything We Do
          </h2>
          <span className='text-uppercase fs-14 text-gray-600 letter-spacing-2'>
            GENERAL INTRODUCTION
          </span>
        </header>

        <span className='fs-16 fw-semibold text-gray-500 w-900px mw-100 align-self-center text-center home-animation fade bot-to-top delay-0-2 text-break'>
          With our eyes on the long-term future, we invest in tomorrow knowing that we can make a
          difference today. Our strong work ethic, financial solidity and professionalism all play a
          vital role in our constant pursuit to be the best in our industry. We take tremendous
          pride in the fact that all of the businesses we operate, invest in and help to manage
          offer high-quality solutions and world-class customer services. At MCK, we seek perfection
          in everything that we do, offering our clients reliable and credible investments that
          deliver sustainable returns.
        </span>
      </div>
    </section>
  )
}

export default Team
