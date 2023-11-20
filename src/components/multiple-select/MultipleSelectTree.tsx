import {FC, Fragment, useRef, useState} from 'react'
import CheckboxTree from 'react-checkbox-tree'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import useClickOutside from '../../app/hooks/useClickOutside'
import {CheckboxTreeItem} from '../../app/types/common'

type Props = {
  isLoading?: boolean
  nodes: CheckboxTreeItem[]
  checked: string[]
  expanded?: string[]
  placeholder?: string
  listCheckedShowTitle?: string[]
  onExpand?: (values: string[]) => void
  onCheck: (values: string[], node: any) => void
}

const MultipleSelectTree: FC<Props> = ({
  isLoading,
  nodes,
  checked,
  expanded,
  onExpand,
  onCheck,
  placeholder,
  listCheckedShowTitle,
}) => {
  const [showTree, setShowTree] = useState<boolean>(false)

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    setShowTree(false)
  })

  function toggleTree() {
    setShowTree(!showTree)
  }

  function findLabel(nodes: CheckboxTreeItem[], value: string) {
    let result: string | undefined

    nodes.some((item) => {
      const {children} = item
      if (item.value === value) {
        result = item.label
        return true
      }
      if (children?.length) {
        result = findLabel(children, value)
        return result ? true : false
      }
      return false
    })

    return result
  }

  return (
    <div
      className='multiple-select-tree min-h-50px d-flex align-items-center form-control form-control-lg form-control-solid position-relative bg-gray-100 p-0'
      ref={selectRef}
    >
      <div
        className='d-flex align-items-center justify-content-between gap-5 h-100 text-gray-700 w-100 cursor-pointer h-100 px-4 py-3'
        onClick={toggleTree}
      >
        <div className='d-flex align-items-center flex-wrap gap-3'>
          {listCheckedShowTitle?.length || checked.length ? (
            (listCheckedShowTitle ? listCheckedShowTitle : checked).map((value) => {
              const label = findLabel(nodes, value)

              if (!label) return <Fragment key={value}></Fragment>
              return (
                <span className='badge bg-gray-300 text-gray-700 fw-bold py-2 px-3' key={value}>
                  {label}
                </span>
              )
            })
          ) : (
            <>
              <span className='text-truncate'>{placeholder}</span>
            </>
          )}
        </div>
        <FontAwesomeIcon className='text-gray-600 fs-sm' icon={faChevronDown} />
      </div>

      {showTree && (
        <div
          className='card card-body position-absolute z-index-1 p-8'
          style={{
            top: 'calc(100% + 8px)',
            left: '0',
            width: 'calc(100% + 1px)',
          }}
        >
          {isLoading || !nodes.length ? (
            <span className='text-center text-gray-700'>
              {isLoading ? 'Loading data, Please wait...' : ' No matching records found'}
            </span>
          ) : (
            <CheckboxTree
              nodes={nodes}
              checked={checked}
              expanded={expanded}
              onCheck={onCheck}
              onExpand={onExpand}
              icons={{
                expandClose: <FontAwesomeIcon icon={faChevronRight} />,
                expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
              }}
              noCascade
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MultipleSelectTree
