/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import Button from '@/components/button/Button'
import {Select} from '@/components/select'
import {useEffect, useState} from 'react'
import request from '@/app/axios'

type Props = {
  id: string | number | any
  show: boolean
  handleClose: () => void
}

export const CreateLoanTypeSchema = Yup.object().shape({
  rejection_id: Yup.string().required('Rejection Type is required'),
  description: Yup.string().max(45, 'Description must be at most 45 characters').nullable(),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const Reject = ({handleClose, show, id}: Props) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    !!id &&
      request
        .post('config/rejection_type/listing', {
          status: true,
          pageSize: 99999,
          currentPage: 1,
        })
        .then((res) => {
          setOptions(res?.data?.data || [])
          setFieldValue(
            'rejection_id',
            res?.data?.data.filter((el: any) => +el.is_default === 1).length > 0 &&
              res?.data?.data.length > 0
              ? res?.data?.data.filter((el: any) => +el.is_default === 1).length > 0
                ? res?.data?.data.filter((el: any) => +el.is_default === 1)[0].id
                : res?.data?.data[0].id
              : ''
          )
        })
        .catch()
  }, [])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      rejection_id: '',
      description: '',
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      console.log(values)
    },
  })

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <>
        <div className='modal-header p-30px'>
          <h2>Reject application</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid p-30px'>
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            <div className='d-flex flex-column mb-16px'>
              <Select
                keyLabelOption='rejection_type_name'
                keyValueOption='id'
                options={options}
                id='rejection_id'
                label={'Rejection Type'}
                name={'rejection_id'}
                value={values.rejection_id || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors['rejection_id'] as string}
                touched={!!touched['rejection_id']}
              />
            </div>
            <div>
              <TextArea
                id='description'
                label={'description'}
                name={'description'}
                value={values['description'] || ''}
                onChange={handleChange}
                error={errors['description'] as string}
                touched={!!touched['description']}
              />
            </div>
          </form>
        </div>
        <div className='border-top border-gray-200'>
          <div className='d-flex justify-content-end p-30px'>
            <Button
              type='reset'
              onClick={() => handleClose()}
              className='btn-lg btn-secondary align-self-center me-8px'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='btn-lg btn-primary'
              onClick={() => {
                handleSubmit()
              }}
              loading={isSubmitting}
            >
              save
            </Button>
          </div>
        </div>
      </>
    </Modal>,
    modalsRoot
  )
}

export default Reject
