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
      <div className='form-check form-check-custom form-check-solid form-switch d-flex justify-content-between align-items-center'>
        {title !== '' && <span className='fs-5 fw-semibold mb-2'>{title}</span>}

        <div className='fv-row'>
          <div className=' form-check form-check-custom form-check-solid form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={checked}
              style={{width: 45, height: 23}}
              onChange={onChange}
              id='kt_builder_sidebar_minimize_desktop_enabled'
            />
            <span className='fw-bold ps-2 fs-6'>{lable}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputCheck
