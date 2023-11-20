import React, {useId} from 'react'

type Props = {
  title?: string
  lable?: string
  showlabelCheck?: boolean
  checked: boolean
  onChange?: () => void
  id?: string
}

const InputCheck = ({title = '', checked = false, onChange, id, showlabelCheck = true}: Props) => {
  const ids = useId()
  return (
    <div>
      <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid d-flex justify-content-start align-content-center mt-xl-6 '>
        {title !== '' && (
          <label
            style={{marginRight: '10px', fontSize: '16px', lineHeight: '24px', fontWeight: '500'}}
            className=' col-form-label   cursor-pointer'
            htmlFor={ids}
          >
            {title}
          </label>
        )}

        <div
          style={{
            height: '24px',
            width: '40px',
          }}
          className=' fv-row'
        >
          <div className='d-flex align-items-center'>
            <label id={id} className='form-check-input'>
              <input
                id={ids}
                style={{
                  height: '24px',
                  width: '40px',
                }}
                className='form-check-input cursor-pointer'
                type='checkbox'
                checked={checked}
                onChange={onChange}
              />
            </label>
          </div>
        </div>
        {showlabelCheck && (
          <div
            style={{
              color: '#99A1B7',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              marginLeft: '8px',
            }}
          >
            {checked ? 'Active' : 'Disable'}
          </div>
        )}
      </div>
    </div>
  )
}

export default InputCheck
