import {Fragment, useMemo, useState} from 'react'
import {EDIT_PROFILE_LIST, PROFILE_CONFIG, currentUser} from './config'
import {formatData} from '@/app/utils'
import clsx from 'clsx'
import ModalEdit from './ModalEdit'

const GeneralInformation = () => {
  const [showModal, setShowModal] = useState<string | null>(null)

  function handleShowModalEdit(key: string) {
    setShowModal(key)
  }

  const config = useMemo(() => {
    const config = EDIT_PROFILE_LIST.find((el) => el.key === showModal)?.config
    return config
  }, [showModal])

  function handleClosePopup() {
    setShowModal(null)
  }

  return (
    <section className='general__info card p-20px d-flex flex-column gap-30px h-100'>
      {showModal && config && (
        <ModalEdit onClose={handleClosePopup} config={config} currentUser={currentUser} />
      )}
      <h3 className='fs-20 fw-bold m-0'>General Information</h3>

      <div className='row gy-16px'>
        {PROFILE_CONFIG.map((el, i) => (
          <div className=' col-12 pt-16px' key={el.key}>
            <div className={clsx(['info-column row gx-0 gy-16px', i === 0 && 'first-child'])}>
              <div className='col-12 col-sm-3'>
                <span className='label text-gray-600'>{el.name}</span>
              </div>
              <div className='col-12 col-sm-9 mt-4px mt-sm-16px'>
                <span
                  className={clsx([
                    'd-flex justify-content-between gap-16px text fw-semibold ps-0 ps-sm-16px',
                    el.className,
                  ])}
                >
                  {formatData(el, currentUser)}

                  {el.isEditField && (
                    <div
                      className='pencil-icon w-25px h-25px flex-shrink-0 d-flex align-items-center justify-content-center rounded-5 bg-hover-light-primary cursor-pointer'
                      onClick={() => handleShowModalEdit(el.key)}
                    >
                      <span className='ki-duotone ki-pencil fs-14'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                      </span>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GeneralInformation
