import dashboardImg from '@/app/images/dashboard-team.png'
import {DashboardProps} from '@/app/types'
import {FC} from 'react'

const Team: FC<DashboardProps> = () => {
  return (
    <section
      className='dashboard-block team py-212px px-60px'
      style={{
        background: `url('${dashboardImg}') no-repeat center center / cover`,
      }}
    >
      <div className='container d-flex flex-column gap-72px'>
        <header className='text-center dashboard-animation fade bot-to-top'>
          <h2 className='text-white fs-44 mb-4px'>At MCK, Perfection in Everything We Do</h2>
          <span className='text-uppercase fs-14 text-gray-600'>GENERAL INTRODUCTION</span>
        </header>

        <span className='text-gray-500 mw-100 align-self-center dashboard-animation fade bot-to-top delay-0-2'>
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
