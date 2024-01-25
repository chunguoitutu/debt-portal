import React from 'react'

type Props = {
  Overviews: any
  setTitle: any
  title: string
  children: JSX.Element
}

const SideBar = ({Overviews, setTitle, title, children}: Props) => {
  return (
    <div className='card h-100'>
      <h1 className='m-0 pt-30px px-30px fs-20 fw-bolder'>Overview</h1>
      <div className='d-flex h-100'>
        <div className='col-3 py-22px ps-16px  h-100'>
          <div
            style={{
              borderRight: '1px solid #F1F1F2',
            }}
            className=' d-flex flex-column gap-8px h-100'
          >
            {Overviews.map((data, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setTitle(data.title)
                  }}
                  style={{
                    backgroundColor: title === data.title ? '#F1F1F2' : 'transparent',
                  }}
                  className={`ps-14px pe-0 py-4px button-overviews-customers fs-16 d-flex justify-content-between align-items-center ${
                    title === data.title
                      ? 'text-gray-900  fw-semibold'
                      : ' text-gray-700  fw-normal'
                  }`}
                >
                  {data.title}{' '}
                  {title === data.title && <p className='button-overviews-customers-2'></p>}
                </button>
              )
            })}
          </div>
        </div>
        <div className='d-flex flex-column col-9  side-bar-customer-details'>
          <div className=' p-30px'>{children}</div>
          <div className='w-100 pt-30px'></div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
