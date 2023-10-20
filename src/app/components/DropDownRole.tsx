import * as React from 'react'
import {PAGE_PERMISSION} from '../utils/pagePermission'

export const DropDownRole = ({id, title, classShared = 'fv-row mb-8'}) => {
  const {setting} = PAGE_PERMISSION
  const [isClick, setIsClick] = React.useState<boolean>(false)
  return (
    <div>
      <div className={`${classShared}`}>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2' htmlFor={id}>
          <span>{title}</span>
        </label>
        <div className='form-control form-control-lg form-control-solid' />
        <div>
          {setting.map((el) => {
            return <div></div>
          })}
        </div>
      </div>
    </div>
  )
}
