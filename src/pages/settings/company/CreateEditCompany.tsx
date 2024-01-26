import {ChangeEvent, Fragment, useMemo} from 'react'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {CheckboxRounded} from '@/components/checkbox'
import {CREATE_COMPANY_CONFIG} from '../organization/config'
import Tippy from '@tippyjs/react'
import {Select} from '@/components/select'
import {COUNTRY_PHONE_CODE, convertErrorMessageResponse, formatDate} from '@/app/utils'
import {CompanyItem} from '@/app/types'

type Props = {
  data?: CompanyItem | null
  handleClose: () => void
  handleUpdated: () => void
}

const CreateEditCompany = ({data, handleClose, handleUpdated}: Props) => {
  const {rows, settings} = CREATE_COMPANY_CONFIG('Business Unit')
  const {validation} = settings || {}

  const generateField = useMemo(() => {
    return rows.reduce((acc, config) => {
      const valueEdit = config.type === 'date' ? formatDate(data?.[config.key]) : data?.[config.key]
      return {
        ...acc,
        [config.key]: data ? valueEdit : config.defaultValue || '',
      }
    }, {} as CompanyItem)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {
    dirty,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setSubmitting,
  } = useFormik({
    initialValues: generateField,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleCreateOrUpdate,
  })

  async function handleCreateOrUpdate() {
    const payload = validation.cast(values) // automatically trim and format number (declare in validateSchema formik)

    try {
      const {data: dataRes} = data?.id
        ? await request.put('config/company/' + data?.id, payload) // edit
        : await request.post('config/company', payload) // create

      // unknown error
      if (dataRes?.error) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(dataRes?.message),
        })
      }

      const message = `Business Unit "${dataRes?.data?.company_name}" successfully ${
        data?.id ? 'updated' : 'created'
      }`

      handleUpdated()
      handleClose()
      swalToast.fire({
        icon: 'success',
        title: message,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(e: ChangeEvent<any>) {
    const {name, type, value, checked} = e.target

    const newValue = type === 'checkbox' ? +checked : value
    setFieldValue(name, newValue)
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={true}
      onHide={handleClose}
      backdrop={true}
    >
      {/* Header */}
      <div className='modal-header padding-model-header'>
        <h2 className='m-0'>{data?.id ? 'Edit' : 'New'} Business Unit</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>

      {/* Form control */}
      <div
        style={{maxHeight: 'calc(100vh - 250px)'}}
        className='modal-body py-30px ps-30px pe-30px overflow-x-auto'
      >
        <div
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className=''>
            <div className='card-body row gx-10 gy-16px'>
              <>
                {rows.map((row) => {
                  const {key, required, type, typeComponent, name} = row
                  const isDisabled = data?.id && key === 'company_code' // disable company code when edit

                  switch (typeComponent) {
                    case 'checkbox-rounded':
                      return (
                        <div className='col-12' key={key}>
                          <CheckboxRounded
                            name={key}
                            label={name}
                            checked={values[key]}
                            onChange={handleChange}
                            id={key}
                          />
                        </div>
                      )
                    case 'input':
                      return (
                        <div key={key} className='col-6'>
                          <div className='d-flex flex-column'>
                            <Input
                              required={required ? true : false}
                              label={name}
                              onBlur={handleBlur}
                              name={key}
                              transparent={key === 'telephone' ? false : true}
                              value={values[key] || ''}
                              type={type}
                              onChange={handleChange}
                              error={errors[key] as string}
                              touched={!!touched[key]}
                              insertLeft={
                                type === 'phone' ? (
                                  <Tippy
                                    offset={[120, 0]}
                                    content='Please choose the phone number you prefer'
                                    disabled
                                  >
                                    {/* Wrapper with a span tag to show tooltip */}
                                    <span>
                                      <Select
                                        onChange={handleChange}
                                        value={values[key]}
                                        isOptionDefault={false}
                                        classShared='m-0'
                                        className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                                        name='country_phone_code'
                                        options={COUNTRY_PHONE_CODE}
                                        disabled={true}
                                      />
                                    </span>
                                  </Tippy>
                                ) : undefined
                              }
                              disabled={isDisabled}
                            />
                          </div>
                        </div>
                      )
                    default:
                      return <Fragment key={key}></Fragment>
                  }
                })}
              </>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => handleClose()}
          className='btn-lg btn-secondary align-self-center me-8px fs-14'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary fs-14'
          type='submit'
          disabled={isSubmitting || (data && !dirty)}
          loading={isSubmitting}
          onClick={() => handleSubmit()}
        >
          {data?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateEditCompany
