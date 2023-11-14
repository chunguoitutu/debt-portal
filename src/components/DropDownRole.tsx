import {FC} from 'react'
import MultipleSelectTree from './multiple-select/MultipleSelectTree'
import {PAGE_PERMISSION} from '../app/utils/pagePermission'

interface Props {
  id?: string
  title: string
  classShared: string
  checked: string[]
  expanded?: string[]
  onExpand?: (values: string[]) => void
  onCheck: (values: string[], node: any) => void
  isEdit?: boolean
  data: Array<any>
}

export const DropDownRole: FC<Props> = ({
  id,
  title,
  classShared = 'fv-row mb-8',
  checked = [],
  expanded,
  onCheck,
  onExpand,
  isEdit = false,
  data,
}) => {
  return (
    <div>
      {isEdit ? (
        <div className={`${classShared}`}>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2' htmlFor={id}>
            <span>{title}</span>
          </label>
          <MultipleSelectTree
            placeholder='Select Permissions'
            checked={checked}
            listCheckedShowTitle={checked?.filter(
              (item) =>
                !item.startsWith('view-') &&
                !item.startsWith('add-') &&
                !item.startsWith('edit-') &&
                !item.startsWith('delete-')
            )}
            onCheck={onCheck}
            expanded={expanded}
            onExpand={onExpand}
            nodes={data ? data : PAGE_PERMISSION.setting}
          />
        </div>
      ) : (
        <>{checked ? <div>{checked.join(', ')}</div> : null}</>
      )}
    </div>
  )
}
