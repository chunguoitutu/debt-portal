import React from 'react'

type Props = {
  title: string
  lable?: string
  checked: boolean
  onChange?: () => void
  id?: string
}

const InputCheck = ({title, lable, checked = false, onChange, id}: Props) => {
  return (
    <div>
      <div className='row mb-6 '>
        <label className='col-lg-4 col-form-label fw-bold fs-6'>{title}</label>

        <div className='col-lg-8 fv-row'>
          <div className='d-flex align-items-center mt-3 '>
            <label
              id={id}
              className='form-check cursor-pointer  form-check-inline form-check-solid me-5'
            >
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
