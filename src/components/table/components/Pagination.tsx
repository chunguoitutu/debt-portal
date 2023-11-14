/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useMemo} from 'react'
import {SearchCriteria} from '../../../app/types/common'

type Props = {
  onChangePagePagination: (pagination: Omit<SearchCriteria, 'total'>) => void
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

const Pagination = ({onChangePagePagination, isLoading, searchCriteria}: Props) => {
  const {total, currentPage, pageSize} = searchCriteria

  // no item found will return 1
  const totalPagination = useMemo(() => {
    return Math.ceil(total / pageSize) || 1
  }, [total, pageSize])

  const arrayPage = useMemo(() => {
    const array = Array.from({length: totalPagination || 0}).map((_, i) => i + 1)

    let result = [1]
    const _currentPage = array.find((i) => i === currentPage)

    if (!_currentPage || _currentPage < 1 || _currentPage > totalPagination) return result

    if (_currentPage === 1) {
      // Index = 0 -> currentPage = 1
      result = array.slice(0, 3)

      return result
    }
    if (_currentPage >= totalPagination) {
      // Index = total pagination -> last page
      result = array.slice(-3)
      return result
    }
    if (_currentPage > 0 && _currentPage < totalPagination) {
      result = [_currentPage - 1, _currentPage, _currentPage + 1]
      return result
    }

    return result

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPagination, currentPage, pageSize])

  return (
    <div className='d-flex justify-content-end'>
      <div id='kt_table_users_paginate'>
        <ul className='pagination'>
          <li
            className={clsx('page-item', {
              disabled: isLoading || currentPage === 1,
            })}
          >
            <a
              onClick={() => onChangePagePagination({pageSize, currentPage: 1})}
              style={{cursor: 'pointer'}}
              className='page-link'
            >
              First
            </a>
          </li>
          <li
            className={clsx('page-item', {
              disabled: isLoading || currentPage === 1,
              previous: true,
            })}
          >
            <a
              className={clsx('page-link', {
                'page-text': true,
              })}
              onClick={() => onChangePagePagination({pageSize, currentPage: 1})}
              style={{cursor: 'pointer'}}
            >
              {mappedLabel('&laquo; Previous')}
            </a>
          </li>

          {arrayPage.map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={clsx('page-item', {
                  active: currentPage === pageNumber,
                  disabled: isLoading,
                })}
              >
                <a
                  className={clsx('page-link')}
                  onClick={() => {
                    onChangePagePagination({pageSize, currentPage: pageNumber})
                  }}
                  style={{cursor: 'pointer'}}
                >
                  {pageNumber}
                </a>
              </li>
            )
          })}

          <li
            className={clsx('page-item', {
              disabled: isLoading || currentPage >= totalPagination,
              next: true,
            })}
          >
            <a
              className={clsx('page-link', {
                'page-text': true,
              })}
              onClick={() => onChangePagePagination({pageSize, currentPage: currentPage + 1})}
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
              onClick={() => onChangePagePagination({pageSize, currentPage: totalPagination})}
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
