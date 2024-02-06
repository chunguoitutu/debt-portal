import dashboardImg from '@/app/images/dashboard-financial.png'
import {HomeProps} from '@/app/types'
import {FC} from 'react'
import financialInstitutionsImg from '@/app/images/dashboard-financial-institutions.svg'

const FinancialInstitutions: FC<HomeProps> = () => {
  return (
    <section className='py-100px'>
      <div className='container padding-responsive d-flex flex-column align-items-center gap-72px'>
        <header className='text-center home-animation fade bot-to-top position-relative w-fit-content'>
          <div className='mw-100 pe-none user-select-none position-relative h-0 z-index-negative'>
            <img
              src={financialInstitutionsImg}
              alt='financial institutions'
              className='mw-100 object-fit-cover'
            />
          </div>
          <h2 className='home__title fs-46 mb-4px two-line'>Financial Institutions</h2>
          <span className='text-uppercase fs-14 text-gray-600 letter-spacing-2'>
            GENERAL INTRODUCTION
          </span>
        </header>

        <div className='d-flex flex-column flex-lg-row justify-content-between gap-20px'>
          <img
            src={dashboardImg}
            alt='financial institutions'
            className='fade home-animation w-475px mw-100 object-fit-cover'
          />

          <div className='d-flex flex-column gap-24px text-gray-900'>
            <h6 className='m-0 fs-16 fw-normal home-animation fade bot-to-top delay-0-2 text-justify'>
              A cornerstone of our business for more than a decade, MCK has invested heavily in
              financial institutions and will continue to invest in this important, high-return
              sector. Until now, our focus has been on businesses offering unsecured personal and
              business loans.
            </h6>
            <h6 className='m-0 fs-16 fw-normal home-animation fade bot-to-top delay-0-4 text-justify'>
              However, we see finance as a robust growth market with strong potential in secure
              business loans and home loans. As a major financial hub in Southeast Asia, the
              financial sector is crucial to Singapore's economy and as digital transformation
              progresses throughout the region we believe the sector will move from strength to
              strength.
            </h6>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancialInstitutions
