/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'

import {useMemo} from 'react'
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
  const paginationLinks = useMemo(
    () => [
      {
        url: '/?page=1',
        label: '1',
        active: true,
        page: 1,
      },
      {
        url: '/?page=2',
        label: '2',
        active: false,
        page: 2,
      },
      {
        url: '/?page=3',
        label: '3',
        active: false,
        page: 3,
      },
    ],
    [pagination]
  )

  const totalPagination = useMemo(() => {
    return Math.ceil(searchCriteria.total / searchCriteria.pageSize)
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
              disabled: isLoading,
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
          {Array.from({length: totalPagination}).map((link, ind) => (
            <li
              key={ind}
              className={clsx('page-item', {
                active: searchCriteria.currentPage === ind + 1,
                disabled: isLoading,
              })}
            >
              <a
                className={clsx('page-link')}
                onClick={() => changePagePagination(ind, PER_PAGE)}
                style={{cursor: 'pointer'}}
              >
                {ind + 1}
              </a>
            </li>
          ))}
          <li
            className={clsx('page-item', {
              disabled: isLoading,
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
              disabled: isLoading || pagination.page === pagination.links?.length! - 2,
            })}
          >
            <a
              onClick={() => changePagePagination(pagination.links?.length! - 2, PER_PAGE)}
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
