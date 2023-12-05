import {FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, useId, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import ErrorMessage from '../error/ErrorMessage'
import Label from '../label'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  classShared?: string
  classInputWrap?: string
  insertLeft?: ReactNode
  insertRight?: ReactNode
  type?: HTMLInputTypeAttribute | 'money'
  symbolMoney?: string
  noThereAreCommas?: boolean
  showIconTogglePassword?: boolean
  error?: string
  touched?: boolean
}

const numberAllowDotRegex = /^[0-9.]+$/

const Input: FC<Props> = ({
  id,
  name,
  label,
  insertLeft,
  insertRight,
  type = 'text',
  className = '',
  classShared = '',
  symbolMoney = '$',
  noThereAreCommas = true,
  required = false,
  showIconTogglePassword = true,
  value = '',
  classInputWrap = 'form-control-solid',
  error,
  touched,
  ...rest
}) => {
  const [typeCustom, setTypeCustom] = useState<string>(
    type === 'money' ? 'number' : type === 'number' ? 'text' : type
  )

  const defaultId = useId()

  // Only handle for type password
  function handleChangeTypeInput() {
    if (type === 'password') {
      setTypeCustom(typeCustom === 'password' ? 'text' : 'password')
    }
  }

  function handleKeyPress({noThereAreCommas = true, e}: any) {
    e = e || window.event
    const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
    const charStr = String.fromCharCode(charCode)
    const dotInvalid = noThereAreCommas
      ? charStr === '.' && noThereAreCommas
      : e.target.value.includes('.') && charStr === '.'
    ;(dotInvalid || !charStr.match(numberAllowDotRegex)) && e.preventDefault()
  }

  function handlePaste({noThereAreCommas = true, e}: any) {
    let valueCopied = e.clipboardData.getData('text/plain')
    const oldValue = +e.target.value
    if (
      Number.isNaN(+valueCopied) ||
      ((oldValue % 1 !== 0 || noThereAreCommas) && +valueCopied % 1 !== 0) ||
      +valueCopied < 0
    )
      e.preventDefault()
  }

  return (
    <div className={`${classShared}`}>
      {label && (
        <Label
          htmlFor={id || defaultId || name}
          className='d-flex align-items-center fs-16 fw-semibold mb-8px'
          label={label}
          required={required}
        />
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
          onKeyPressCapture={(e) =>
            type === 'number' && handleKeyPress({e: e, noThereAreCommas: noThereAreCommas})
          }
          onPaste={(e) =>
            type === 'number' && handlePaste({e: e, noThereAreCommas: noThereAreCommas})
          }
          type={typeCustom}
          className={`form-control bg-inherit rounded-0 border-0 p-12px w-100 outline-none fw-semibold text-gray-700 fs-4 ${className}`}
          value={value}
          id={id || defaultId || name}
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

      {error && touched && <ErrorMessage className='mt-2' message={error} />}
    </div>
  )
}

export default Input
