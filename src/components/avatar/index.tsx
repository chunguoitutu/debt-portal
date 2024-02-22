import {ChangeEvent, FC, InputHTMLAttributes, useEffect, useMemo, useState} from 'react'
import './style.scss'
import clsx from 'clsx'
import camera from '@/app/images/camera.svg'
import noAvatar from '@/app/images/no-avatar.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  size?: string | number
  className?: string // used in var $custom-sizes. Reference links: src/_metronic/assets/sass/core/components/_variables.scss
  file: string
  onRemove?: () => void
  showUpload?: boolean
  showIconClose?: boolean
}

const Avatar: FC<Props> = ({
  className,
  size,
  file,
  showUpload = true,
  showIconClose = true,
  onChange,
  onRemove,
  ...rest
}) => {
  return (
    <div className={clsx(['avatar flex-shrink-0', size && `w-${size}`, className])}>
      <img
        className='w-100 aspect-ratio-1-1 object-fit-cover rounded-inherit'
        src={file || noAvatar}
        alt='avatar'
      />

      {/* Remove file */}
      {file && showIconClose && (
        <FontAwesomeIcon
          icon={faClose}
          className='close-icon cursor-pointer text-hover-danger'
          onClick={onRemove}
        />
      )}

      {/* Upload file */}
      {showUpload && (
        <label className='camera-wrap rounded-circle cursor-pointer' htmlFor='upload'>
          <input
            type='file'
            id='upload'
            hidden
            onChange={(e) => {
              onChange(e)
            }}
            {...rest}
          />
          <img className='camera-img w-100 h-100 object-fit-cover' src={camera} alt='camera' />
        </label>
      )}
    </div>
  )
}

export default Avatar
