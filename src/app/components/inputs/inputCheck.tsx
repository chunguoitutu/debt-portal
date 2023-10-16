import React from 'react'

type Props = {
  title?: string
  lable?: string
  checked: boolean
  onChange?: () => void
  id?: string
}

const InputCheck = ({title = '', lable, checked = false, onChange, id}: Props) => {
  return (
    <div>
      <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid d-flex justify-content-start align-content-center mt-xl-6 '>
        {title !== '' && <label className='col-lg-4 col-form-label fw-bold fs-6'>{title}</label>}

        <div className=' fv-row'>
          <div className='d-flex align-items-center'>
            <label id={id} className='form-check-input'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={checked}
                onChange={onChange}
              />
              <span className='fw-bold ps-2 fs-6'>{lable}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputCheck
