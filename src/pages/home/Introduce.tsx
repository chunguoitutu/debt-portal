import clsx from 'clsx'
import {INTRODUCE_LIST} from './config'
import {FC} from 'react'
import {HomeProps} from '@/app/types'

const Introduce: FC<HomeProps> = ({screenWidth}) => {
  return (
    <section className='dashboard-block'>
      <div className='row g-0'>
        {INTRODUCE_LIST.map((el, i) => (
          <div className='col-12 col-sm-4' key={i}>
            <div className={clsx([`introduce introduce-${i} p-16px h-100`, el.className])}>
              <div
                className={clsx([
                  'wrap d-flex flex-column gap-24px p-16px h-100 home-animation fade bot-to-top',
                  screenWidth > 575 && `delay-0-${2 + 2 * i}`, // add delay transition for screen width greater than 575px (screen sm)
                ])}
              >
                <h3 className='text-white text-center fs-20 fw-semibold'>{el.label}</h3>
                <span className='introduce__text text-center six-line text-gray-500 fs-14 fw-semibold'>
                  {el.content}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Introduce
