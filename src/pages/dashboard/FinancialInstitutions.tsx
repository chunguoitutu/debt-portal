import dashboardImg from '@/app/images/dashboard-financial.png'
import {DashboardProps} from '@/app/types'
import {FC} from 'react'

const FinancialInstitutions: FC<DashboardProps> = () => {
  return (
    <section className='dashboard-block py-100px'>
      <div className='container d-flex flex-column gap-72px'>
        <header className='text-center dashboard-animation fade bot-to-top'>
          <h2 className='fs-44 mb-4px'>Financial Institutions</h2>
          <span className='text-uppercase fs-14 text-gray-600'>GENERAL INTRODUCTION</span>
        </header>

        <div className='d-flex flex-column flex-lg-row justify-content-between gap-20px'>
          <img
            src={dashboardImg}
            alt='financial institutions w-475px object-fit-cover'
            className='fade dashboard-animation'
          />

          <div className='d-flex flex-column gap-24px text-gray-900 text-capitalize'>
            <h6 className='m-0 fs-16 dashboard-animation fade bot-to-top delay-0-2'>
              A cornerstone of our business for more than a decade, MCK has invested heavily in
              financial institutions and will continue to invest in this important, high-return
              sector. Until now, our focus has been on businesses offering unsecured personal and
              business loans
            </h6>
            <h6 className='m-0 fs-16 dashboard-animation fade bot-to-top delay-0-4'>
              however, we see finance as a robust growth market with strong potential in secure
              business loans and home loans. As a major financial hub in Southeast Asia, the
              financial sector is crucial to Singapore's economy and as digital transformation
              progresses throughout the region we believe the sector will move from strength to
              strength
            </h6>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancialInstitutions
