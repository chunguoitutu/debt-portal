/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'

import {PageTitle} from '@/_metronic/layout/core'
import {toAbsoluteUrl} from '@/_metronic/helpers'
import {ApplicationDemoDashBoard} from '@/pages/dashboard/component/ApplicationDashBoard'
import {ToDoList} from '@/pages/dashboard/component/ToDoList'
import {CustomerListingDashboard} from '@/pages/dashboard/component/CustomerDashboard'
import {CountApplication} from '@/pages/dashboard/component/CountApplication'
import {ExternalLinks} from '@/pages/dashboard/component/ExternalLinks'
import {ChartDashboard} from '@/pages/dashboard/component/ChartDashboard'
import {ContactDashBoard} from '@/pages/dashboard/component/ContactDashboard'

const DashboardPage: FC = () => (
  <>
    {/*Part 1*/}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CountApplication
          className='h-md-50 mb-5 mb-xl-10'
          description='Active Projects'
          color='#F1416C'
          img={toAbsoluteUrl('/media/patterns/vector-1.png')}
        />
        <ContactDashBoard
          className='h-md-50 mb-5 mb-xl-10'
          description='Professionals'
          icon={false}
          stats={357}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>

      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <ChartDashboard className='h-md-50 mb-5 mb-xl-10' />
        <ExternalLinks className='h-lg-50' />
      </div>

      <div className='col-xxl-6'>
        <ApplicationDemoDashBoard />
      </div>
    </div>

    {/**Part 2 */}
    <div className='row gx-5 gx-xl-10'>
      <div className='col-xxl-6 mb-5 mb-xl-10'></div>
    </div>

    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ToDoList className='card-xxl-stretch mb-xl-3' />
      </div>

      <div className='col-xl-8'>
        <CustomerListingDashboard className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
