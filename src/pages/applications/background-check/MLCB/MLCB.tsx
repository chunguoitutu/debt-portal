import request from '@/app/axios'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import {FC, useState} from 'react'
import {useParams} from 'react-router-dom'

type Props = {
  onClose: () => void
}

const MLCB: FC<Props> = ({onClose}) => {
  const [loading, setLoading] = useState<'BM' | 'ME' | null>(null)
  const {applicationIdEdit} = useParams()

  async function handleGetMLCBReport(type: 'BM' | 'ME') {
    if (!applicationIdEdit) {
      onClose()
      return swalToast.fire({
        icon: 'error',
        title: 'You can get MLCB report only when the loan application is in Awaiting Approval',
      })
    }
    setLoading(type)
    try {
      const {data} = await request.post(`/site/mlcb-check`, {
        id: +applicationIdEdit,
        report_type: type,
      })

      if (!data.error) {
        onClose()
        swalConfirm.fire({
          icon: 'success',
          title: data?.message || 'Success',
          showCancelButton: false,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'm-w-300px',
            htmlContainer: 'fs-3',
            cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
            confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
            actions: 'd-flex justify-content-center w-100 ',
          },
        })
      }
    } catch (error) {
      const message = convertErrorMessageResponse(error)

      onClose()
      swalConfirm.fire({
        icon: 'error',
        title: message,
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          popup: 'm-w-300px',
          htmlContainer: 'fs-3',
          cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
          confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
          actions: 'd-flex justify-content-center w-100 ',
        },
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className='p-0 m-0'>
      <div className='d-flex flex-column p-30px w-100 gap-12px'>
        <h1 className='m-0 fs-20 fw-bold'>Pre-Loan Declaration</h1>
        <span className='fs-16 fw-semibold'>
          In submitting this request for a credit report in relation to the loan applicant under
          section 30(5)(a) of the Moneylenders Act, we declare that:
        </span>

        <ol className='list-style-position-inside p-0'>
          <li className='fs-14 fw-semibold text-gray-700'>
            We hold a valid moneylending licence under the Moneylenders Act.
          </li>
          <li className='fs-14 fw-semibold text-gray-700'>
            We submit this request to the Moneylenders Credit Bureau solely for the purpose of
            assessing the creditworthiness of the loan applicant and for complying with the
            aggregate unsecured loan caps under the Moneylenders Act and Rules.
          </li>
        </ol>
      </div>

      <div className='border-top border-gray-200 p-30px gap-3'>
        <div className='d-flex align-items-center justify-content-end gap-8px'>
          <Button
            loading={loading === 'BM'}
            disabled={!!loading}
            onClick={() => handleGetMLCBReport('BM')}
          >
            Confirm to Get BM Borrower Report
          </Button>
          <Button
            loading={loading === 'ME'}
            disabled={!!loading}
            onClick={() => handleGetMLCBReport('ME')}
          >
            Confirm to Get ME Enhanced CB Report
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MLCB
