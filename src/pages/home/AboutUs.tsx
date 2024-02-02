import dashboardCeo from '@/app/images/dashboard-ceo.png'
import quote from '@/app/images/quote.png'
import {HomeProps} from '@/app/types'
import {FC} from 'react'

const AboutUs: FC<HomeProps> = () => {
  return (
    <section className='about-us py-100px'>
      <div className='container d-flex flex-column flex-lg-row align-items-center gap-30px'>
        <img
          src={dashboardCeo}
          alt='team-img'
          className='about-us__img w-400px mw-100 flex-shrink-0 rounded-circle pt-8px ps-20px object-fit-cover home-animation fade'
        />

        <div className='d-flex flex-column align-items-center'>
          <img
            src={quote}
            alt='quote'
            className='mb-20px d-block home-animation fade align-self-center align-self-lg-start'
          />
          <span className='text-uppercase fs-14 text-gray-600 mb-4px align-self-center align-self-lg-start letter-spacing-2'>
            GENERAL INTRODUCTION
          </span>
          <h3 className='fs-46 mb-20px fw-bold align-self-center align-self-lg-start home__title two-line'>
            Message from our Chairman
          </h3>

          <span className='d-inline-block fs-20 mb-20px fw-semibold home-animation fade delay-0-2 align-self-start text-blue-medium'>
            “Our goal is to create a better and more sustainable tomorrow, for you and your future
            generations.”
          </span>

          <div className='home-animation fade delay-0-4 align-self-start'>
            <h5 className='text-primary m-0 fs-20'>Daniel Koh</h5>
            <h6 className='text-capitalize fw-normal text-gray-700 fs-14'>
              Chairman & Founder of MCK Group
            </h6>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
