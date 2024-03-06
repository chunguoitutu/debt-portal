import useClickOutside from '@/app/hooks/useClickOutside'
import clsx from 'clsx'
import {FC, useRef, useState} from 'react'
import {TAGGING_OPTIONS} from './config'
import TagIcon from '@/app/images/tag.svg?react'
import {LabelTaggingOption} from '@/app/types'
import {swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Loading from '@/components/loading'

type Props = {
  showTaggingOptions: boolean
  onClose: () => void
  onReloadApi: () => void
}

const TaggingOptions: FC<Props> = ({showTaggingOptions, onClose, onReloadApi}) => {
  const [loadingLabel, setLoadingLabel] = useState<LabelTaggingOption | null>(null)

  const modalRef = useRef(null)
  useClickOutside(modalRef, () => showTaggingOptions && onClose())

  function handleChooseTagItem(label: LabelTaggingOption) {
    switch (label) {
      case 'Bankruptcy - death':
        return handleDetectBorrowerDeath()
      case 'Payment appointment':
        return handleScheduleAPaymentDate()
      default:
        return
    }
  }

  async function handleDetectBorrowerDeath() {
    try {
      setLoadingLabel('Bankruptcy - death')

      await new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
      onClose()
      onReloadApi()
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setLoadingLabel(null)
    }
  }

  async function handleScheduleAPaymentDate() {
    try {
      setLoadingLabel('Payment appointment')

      await new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
      onClose()
      onReloadApi()
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setLoadingLabel(null)
    }
  }

  return (
    <div
      className={clsx([
        'tag-overlay d-flex align-items-end justify-content-center',
        showTaggingOptions && 'active',
      ])}
    >
      <div ref={modalRef} className={clsx(['tag-options card rounded-32px p-20px'])}>
        <h3 className='mb-16px fs-16 fw-bold'>Tagging Options</h3>

        <div className='d-flex flex-column'>
          {TAGGING_OPTIONS.map((o, i) => {
            return (
              <div
                key={o.label}
                className={clsx([
                  'tag-item d-flex align-items-center rounded-8px py-16px px-12px gap-8px cursor-pointer',
                  i !== 0 && 'border-top border-gray-200',
                ])}
                onClick={() => handleChooseTagItem(o.label)}
              >
                <div className={clsx(['mw-20px', o.classNameIcon])}>
                  <TagIcon />
                </div>
                <span className='fs-16 flex-grow-1'>{o.label}</span>

                {o.label === loadingLabel && <Loading showText={false} size='20px' />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TaggingOptions
