import React from 'react'

type Props = {
  title?: string
  label?: string
  checked: boolean
  onChange?: () => void
  id?: string
}

const InputCheck = ({title = '', label, checked = false, onChange, id}: Props) => {
  return (
    <div>
      <div className='form-check form-check-custom form-check-solid form-switch' >
        {title !== '' && <span className='fs-5 fw-semibold mb-2'>{title}</span>}

        <div className='fv-row'>
          <div className=' form-check form-check-custom form-check-solid form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={checked}
                style={{width: 45, height: 23, marginLeft: 20}}
                onChange={onChange}
                id='kt_builder_sidebar_minimize_desktop_enabled'
              />
              <span className='fw-bold ps-2 fs-6'>{label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputCheck
