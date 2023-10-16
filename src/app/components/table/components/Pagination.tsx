/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'

import * as React from 'react'
import {useQueryResponsePagination} from '../../../modules/apps/user-management/users-list/core/QueryResponseProvider'

type SearchCriteria = {
  pageSize: number
  currentPage: number
  total: number
}

type Props = {
  changePagePagination: (page: number, pageSize: number) => void
  isLoading: boolean
  searchCriteria: SearchCriteria
}

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const Pagination = ({changePagePagination, isLoading, searchCriteria}: Props) => {
  const PER_PAGE = 10
  const pagination = useQueryResponsePagination()
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  const totalPagination = React.useMemo(() => {
    return Math.ceil(searchCriteria.total / searchCriteria.pageSize)
  }, [searchCriteria])

  React.useEffect(() => {
    const {currentPage} = searchCriteria
    setCurrentPage(currentPage)
  }, [searchCriteria])

  return (
    <div className='d-flex justify-content-end'>
      <div id='kt_table_users_paginate'>
        <ul className='pagination'>
          <li
            className={clsx('page-item', {
              disabled: isLoading || pagination.page === 1,
            })}
          >
            <a
              onClick={() => changePagePagination(1, PER_PAGE)}
              style={{cursor: 'pointer'}}
              className='page-link'
            >
              First
            </a>
          </li>
          <li
            className={clsx('page-item', {
              disabled: isLoading || currentPage - 1 <= 0,
              previous: true,
            })}
          >
            <a
              className={clsx('page-link', {
                'page-text': true,
                'me-5': true,
              })}
              onClick={() => changePagePagination(1, PER_PAGE)}
              style={{cursor: 'pointer'}}
            >
              {mappedLabel('&laquo; Previous')}
            </a>
          </li>
          {Array.from({length: totalPagination})}
          {Array.from({length: totalPagination}).map((_, ind) => (
            <li
              key={ind}
              className={clsx('page-item', {
                active: searchCriteria.currentPage === ind + 1,
                disabled: isLoading,
              })}
            >
              <a
                className={clsx('page-link')}
                onClick={() => {
                  changePagePagination(ind, PER_PAGE)
                  setCurrentPage(ind)
                }}
                style={{cursor: 'pointer'}}
              >
                {ind + 1}
              </a>
            </li>
          ))}
          <li
            className={clsx('page-item', {
              disabled: isLoading || currentPage + 1 >= totalPagination,
              next: true,
            })}
          >
            <a
              className={clsx('page-link', {
                'page-text': true,
              })}
              onClick={() => changePagePagination(1, PER_PAGE)}
              style={{cursor: 'pointer'}}
            >
              {mappedLabel('Next &raquo;')}
            </a>
          </li>
          <li
            className={clsx('page-item', {
              disabled: isLoading || totalPagination === currentPage,
            })}
          >
            <a
              onClick={() => changePagePagination(totalPagination, PER_PAGE)}
              style={{cursor: 'pointer'}}
              className='page-link'
            >
              Last
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Pagination
