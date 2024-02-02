import React, {FC, useState} from 'react'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTIcon} from '../../../../helpers'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
  hasDropdown?: boolean
}

const MenuItem: FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
  hasDropdown,
}) => {
  const {pathname} = useLocation()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleMouseEnter = () => {
    if (title === 'Applications') {
      setIsDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (title === 'Applications') {
      setIsDropdownOpen(false)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='menu-item me-lg-1'
      style={{
        position: 'relative',
      }}
    >
      <Link
        className={clsx('menu-link py-3', {
          'active menu-here': checkIsActive(pathname, to),
        })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
      {hasDropdown && isDropdownOpen && (
        <div
          style={{
            position: 'relative',
          }}
        ></div>
      )}
    </div>
  )
}

export {MenuItem}
