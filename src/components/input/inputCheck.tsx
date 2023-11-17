import React, {useId} from 'react'

type Props = {
  title?: string
  lable?: string
  checked: boolean
  onChange?: () => void
  id?: string
}

const InputCheck = ({title = '', checked = false, onChange, id}: Props) => {
  const ids = useId()
  return (
    <div>
      <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid d-flex justify-content-start align-content-center mt-xl-6 '>
        {title !== '' && (
          <label
            style={{marginRight: '10px'}}
            className=' col-form-label fw-bold fs-6 cursor-pointer'
            htmlFor={ids}
          >
            {title}
          </label>
        )}

        <div className=' fv-row'>
          <div className='d-flex align-items-center'>
            <label id={id} className='form-check-input'>
              <input
                id={ids}
                className='form-check-input cursor-pointer'
                type='checkbox'
                checked={checked}
                onChange={onChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputCheck
