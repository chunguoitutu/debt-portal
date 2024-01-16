import React, {useState} from 'react'
import Profile from './Profile'
import Employment from './Employment'
import Vehicle from './Vehicle'
import CPF from './CPF'
import Status from './Status'
import Addresses from './Addresses'

type Props = {}

const Overviews = [
  {
    title: 'Profile',
    Comment: Profile,
  },
  {
    title: 'Addresses',
    Comment: Addresses,
  },
  {
    title: 'Employment',
    Comment: Employment,
  },
  {
    title: 'Vehicle',
    Comment: Vehicle,
  },
  {
    title: 'CPF',
    Comment: CPF,
  },
  {
    title: 'Status',
    Comment: Status,
  },
]
const Overview = (props: Props) => {
  const [title, setTitle] = useState('Profile')
  return (
    <div className='card h-100'>
      <h1 className='m-0 pt-30px px-30px'>Overview</h1>
      <div className='d-flex'>
        <div className='col-3 py-22px ps-16px '>
          <div
            style={{
              borderRight: '1px solid #F1F1F2',
            }}
            className=' d-flex flex-column gap-8px'
          >
            {Overviews.map((data) => {
              return (
                <button
                  onClick={() => {
                    setTitle(data.title)
                  }}
                  style={{
                    backgroundColor: title === data.title ? '#F1F1F2' : 'transparent',
                  }}
                  className='ps-14px pe-0 py-4px button-overviews-customers d-flex justify-content-between align-items-center'
                >
                  {data.title}{' '}
                  {title === data.title && <p className='button-overviews-customers-2'></p>}
                </button>
              )
            })}
          </div>
        </div>
        <div className='d-flex flex-column col-9 '>
          <div
            style={{
              maxHeight: 'calc(100vh - 620px)',
              overflow: 'auto',
              minHeight: '200px',
            }}
            className=' p-30px'
          >
            {Overviews.map((data) => {
              const Component = data.Comment
              if (data.title === title) {
                return <Component />
              }
            })}
          </div>
          <div className='w-100 pt-30px'></div>
        </div>
      </div>
    </div>
  )
}

export default Overview
