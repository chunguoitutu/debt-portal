import * as React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Applications',
    path: '/applications',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export const Applications = () => {
  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='d-flex flex-row'>
        <div className='border-4 h-50' style={{height: '100%', flex: '0 0 20%'}}>
          <span>col 1</span>
        </div>
        <div className='border-4 h-50' style={{height: '100%', flex: '0 0 60%'}}>
          <span>row 2</span>
        </div>
        <div className='border-4 h-50' style={{height: '100%', flex: '0 0 20%'}}>
          <span>row 3</span>
        </div>
      </div>
    </>
  )
}
