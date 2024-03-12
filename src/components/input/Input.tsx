import {
  ForwardRefRenderFunction,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react'
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
  symbolUrl?: string
  noThereAreCommas?: boolean
  showIconTogglePassword?: boolean
  error?: string
  touched?: boolean
  transparent?: boolean
  classNameAdvanced?: string
}

const numberAllowDotRegex = /^[0-9.]+$/

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    name,
    label,
    transparent = false,
    insertLeft,
    insertRight,
    type = 'text',
    className = '',
    classShared = '',
    symbolMoney = '$',
    symbolUrl = 'https://',
    noThereAreCommas = true,
    required = false,
    showIconTogglePassword = true,
    value = '',
    classInputWrap = 'form-control-solid',
    error,
    touched,
    classNameAdvanced = '',
    ...rest
  },
  ref
) => {
  const [typeCustom, setTypeCustom] = useState<string>(
    ['money', 'phone', 'number'].includes(type) ? 'text' : type
    // ['money', 'number'].includes(type) ? 'number' : type === 'phone' ? 'text' : type
  )

  const defaultId = useId()

  // Only handle for type password
  function handleChangeTypeInput() {
    if (type === 'password') {
      setTypeCustom(typeCustom === 'password' ? 'text' : 'password')
    }
  }

  // handle remove characters not allowed
  function handleKeyPress({noThereAreCommas = true, e}: any) {
    const oldValue = (e.target.value as string) || ''
    const caretPosition = e.target.selectionStart
    const newValue = +`${oldValue.slice(0, caretPosition)}${e.data}${oldValue.slice(caretPosition)}`

    // Only allow integer
    if (!noThereAreCommas) {
      const isInteger = Number.isInteger(newValue)
      !isInteger && e.preventDefault()
    }

    // Allow positive number
    !newValue && e.preventDefault()
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
          className='d-flex align-items-center fs-14 fw-semibold mb-8px'
          label={label}
          required={required}
        />
      )}
      <div
        className={clsx([
          ` ${
            transparent ? 'input-advance_transparent' : 'input-advance'
          } form-input-custom form-control form-control-lg p-0 d-flex align-items-center overflow-hidden form-control-solid`,
          classInputWrap,
          rest.disabled && 'disabled',
        ])}
      >
        {type === 'money' ? (
          <span className='ps-5  flex text-gray-600 bg-transparent' style={{marginTop: '2px'}}>
            {symbolMoney}
          </span>
        ) : (
          insertLeft && insertLeft
        )}

        {type === 'web_url' ? (
          <span className='ps-5 fs-4 text-gray-600' style={{marginTop: '2px'}}>
            {symbolUrl}
          </span>
        ) : (
          <></>
        )}

        <input
          ref={ref}
          type={typeCustom}
          className={`bg-inherit form-control rounded-0 border-0 px-12px py-10px w-100 h-100 outline-none fw-semibold text-gray-700 fs-16 ${className} ${classNameAdvanced}`}
          id={id || defaultId || name}
          name={name}
          {...(ref ? {} : {value: value})}
          onBeforeInput={(e) =>
            ['number', 'money', 'phone'].includes(type) &&
            handleKeyPress({e: e, onlyInteger: noThereAreCommas})
          }
          onPaste={(e) =>
            ['number', 'money', 'phone'].includes(type) &&
            handlePaste({e: e, noThereAreCommas: noThereAreCommas})
          }
          {...rest}
        />
        {type === 'password'
          ? !!value.toString().length &&
            showIconTogglePassword && (
              <span className='pwd-icon text-gray-400 p-8px text-hover-gray-600 cursor-pointer'>
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

export default forwardRef(Input)
