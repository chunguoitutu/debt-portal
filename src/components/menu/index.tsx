import {MenuProps} from '@/app/types'
import clsx from 'clsx'
import {FC} from 'react'
import './style.scss'

type Props = {
  data: MenuProps[]
  active: string
  className?: string
  onChangeActiveMenu: (newValue: string) => void
}

const HorizontalMenu: FC<Props> = ({data, active, className, onChangeActiveMenu}) => {
  return (
    <div
      className={clsx([
        'horizontal-menu d-flex align-items-center gap-16px text-nowrap overflow-x-auto',
        className,
      ])}
    >
      {data.map((item, i) => {
        const isActive = active === item.value
        return (
          <span
            className={clsx([
              'menu-item fs-14 fw-semibold cursor-pointer pb-16px position-relative',
              isActive ? 'active text-gray-900' : 'text-gray-600',
            ])}
            key={i}
            onClick={() => onChangeActiveMenu(item.value)}
          >
            {item.label}

            {/* Pseudo element */}
            <span className='pseudo h-4px'></span>
          </span>
        )
      })}
    </div>
  )
}

export default HorizontalMenu
