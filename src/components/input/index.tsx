import {FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, useState} from 'react'
import {handleKeyPress, handlePaste} from '../enter-numbers-only'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'id' | 'type' | 'required' | 'name'
  > {
  name?: string
  id?: string
  title?: string
  required?: boolean
  className?: string
  classShared?: string
  classInputWrap?: string
  insertLeft?: ReactNode
  insertRight?: ReactNode
  type?: HTMLInputTypeAttribute | 'money'
  noThereAreCommas?: boolean
  symbolMoney?: string
  showIconTogglePassword?: boolean
}

const Input: FC<Props> = ({
  id,
  name,
  title,
  insertLeft,
  insertRight,
  type = 'text',
  className = '',
  classShared = '',
  symbolMoney = '$',
  value = '',
  noThereAreCommas = true,
  required = false,
  showIconTogglePassword = true,
  classInputWrap = 'form-control-solid',
  ...rest
}) => {
  const [typeCustom, setTypeCustom] = useState<string>(
    type === 'money' ? 'number' : type === 'number' ? 'text' : type
  )

  // Only handle for type password
  function handleChangeTypeInput() {
    if (type === 'password') {
      setTypeCustom(typeCustom === 'password' ? 'text' : 'password')
    }
  }

  return (
    <div className={`${classShared}`}>
      {title && (
        <label
          className='d-flex align-items-center fs-5 fw-semibold mb-8px cursor-pointer'
          htmlFor={name}
        >
          <span
            className={`${
              required ? 'required' : ''
            } text-gray-900 fs-16 text-capitalize fw-semibold `}
          >
            {title}
          </span>
        </label>
      )}
      <div
        className={clsx([
          'input-advance form-control form-control-lg p-0 d-flex align-items-center h-100 overflow-hidden',
          classInputWrap,
        ])}
      >
        {type === 'money' ? (
          <span className='ps-5 text-gray-600'>{symbolMoney}</span>
        ) : (
          insertLeft && insertLeft
        )}
        <input
          onKeyPressCapture={(e) => {
            if (type === 'number') {
              handleKeyPress({e: e, noThereAreCommas: noThereAreCommas})
            }
          }}
          onPaste={(e) => {
            if (type === 'number') {
              handlePaste({e: e, noThereAreCommas: noThereAreCommas})
            }
          }}
          type={typeCustom}
          className={`form-control bg-inherit rounded-0 border-0 p-12px w-100 outline-none fw-semibold text-gray-700 ${className}`}
          value={value}
          id={id || name}
          name={name}
          {...rest}
        />
        {type === 'password'
          ? !!value.toString().length &&
            showIconTogglePassword && (
              <span className='pwd-icon text-gray-400 text-hover-gray-600 cursor-pointer'>
                <FontAwesomeIcon
                  icon={typeCustom === 'password' ? faEyeSlash : faEye}
                  onClick={handleChangeTypeInput}
                />
              </span>
            )
          : insertRight && insertRight}
      </div>
    </div>
  )
}

export default Input
