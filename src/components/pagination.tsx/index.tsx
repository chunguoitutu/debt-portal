import {useMemo} from 'react'
import clsx from 'clsx'
import {MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import {SearchCriteria} from '../../app/types/common'

type Props = {
  onChangePagePagination: (pagination: Omit<SearchCriteria, 'total'>) => void
  isLoading?: boolean
  searchCriteria: SearchCriteria
}

const PaginationArrow = ({onChangePagePagination, isLoading, searchCriteria}: Props) => {
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
    <div>
      <ul className='pagination'>
        <li
          className={clsx('page-item', {
            disabled: isLoading || currentPage === 1,
            next: true,
          })}
        >
          <button
            onClick={() => onChangePagePagination({pageSize, currentPage: currentPage - 1})}
            className={clsx('page-link', {
              'page-text': true,
            })}
            style={{cursor: 'pointer'}}
          >
            <MdOutlineKeyboardArrowLeft
              style={{color: isLoading || currentPage === 1 ? '#6b748d' : '#000', fontSize: '20px'}}
            />
          </button>
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
              <button
                className={clsx('page-link')}
                onClick={() => {
                  onChangePagePagination({pageSize, currentPage: pageNumber})
                }}
                style={{cursor: 'pointer'}}
              >
                {pageNumber}
              </button>
            </li>
          )
        })}
        <li
          className={clsx('page-item', {
            disabled: isLoading || currentPage >= totalPagination,
            next: true,
          })}
        >
          <button
            onClick={() => onChangePagePagination({pageSize, currentPage: currentPage + 1})}
            className={clsx('page-link', {
              'page-text': true,
            })}
            style={{cursor: 'pointer'}}
          >
            <MdOutlineKeyboardArrowRight
              style={{
                color: isLoading || currentPage >= totalPagination ? '#6b748d' : '#000',
                fontSize: '20px',
              }}
            />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default PaginationArrow
