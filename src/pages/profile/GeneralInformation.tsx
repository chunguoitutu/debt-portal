import {Fragment, useMemo, useState} from 'react'
import {PROFILE_CONFIG, currentUser} from './config'
import {formatData} from '@/app/utils'
import clsx from 'clsx'
import ModalEditPhone from './ModalEditPhone'

const GeneralInformation = () => {
  const [showModal, setShowModal] = useState<string | null>('phone')

  function handleShowModalEdit(key: string) {
    if (!['email', 'phone'].includes(key)) return alert('Something went wrong')
    setShowModal(key)
  }

  return (
    <section className='card p-24px d-flex flex-column gap-30px h-100'>
      {showModal === 'phone' && <ModalEditPhone />}
      <h3 className='fs-20 fw-bold m-0'>General Information</h3>

      <div className='row gy-16px gy-sm-24px'>
        {PROFILE_CONFIG.map((el) => (
          <Fragment key={el.key}>
            <div className='col-12 col-sm-3'>
              <span className='fs-14 text-gray-500'>{el.name}</span>
            </div>
            <div className='col-12 col-sm-9 mt-4px mt-sm-24px'>
              <span
                className={clsx([
                  'd-flex justify-content-between gap-16px fs-14 fw-semibold',
                  el.className,
                ])}
              >
                {formatData(el, currentUser)}

                {el.isEditField && (
                  <div
                    className='pencil-icon w-25px h-25px flex-shrink-0 d-flex align-items-center justify-content-center rounded-5 bg-hover-light-primary cursor-pointer'
                    onClick={() => handleShowModalEdit(el.key)}
                  >
                    <span className='ki-duotone ki-pencil'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </span>
                  </div>
                )}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  )
}

export default GeneralInformation
