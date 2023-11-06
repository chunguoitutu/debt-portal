import {FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode} from 'react'
import {handleKeyPress, handlePaste} from '../enter-numbers-only'

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'id' | 'type' | 'required' | 'name'
  > {
  name?: string
  title?: string
  required?: boolean
  className?: string
  classShared?: string
  insertLeft?: ReactNode
  insertRight?: ReactNode
  type?: HTMLInputTypeAttribute | 'money'
  noThereAreCommas?: boolean
  symbolMoney?: string
}

const Input: FC<Props> = ({
  name,
  title,
  insertLeft,
  insertRight,
  type = 'text',
  noThereAreCommas = true,
  required = false,
  className = '',
  classShared = '',
  symbolMoney = '$',
  ...rest
}) => {
  return (
    <div className={`${classShared}`}>
      {title && (
        <label
          className='d-flex align-items-center fs-5 fw-semibold mb-8px cursor-pointer'
          htmlFor={name}
        >
          <span
            style={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '24px',
              color: '#071437',
              textTransform: 'capitalize',
            }}
            className={`${required ? 'required' : ''} `}
          >
            {title}
          </span>
        </label>
      )}
      <div className='input-advance form-control form-control-lg form-control-solid p-0 border-0 d-flex align-items-center h-100 overflow-hidden'>
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
          type={type === 'money' ? 'number' : type}
          className={`form-control-lg px-4 w-100 bg-transparent outline-none h-100 border-0 ${className}`}
          name={name}
          {...rest}
        />
        {insertRight && insertRight}
      </div>
    </div>
  )
}

export default Input
