/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {ChangeEvent, FC, Fragment, useEffect, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {
  COUNTRY_PHONE_CODE,
  convertErrorMessageResponse,
  convertFieldPassword,
  convertFieldRequired,
} from '@/app/utils'
import {DataResponse, TableRow, UserItem} from '@/app/types'
import {CheckboxRounded} from '@/components/checkbox'
import clsx from 'clsx'
import {USER_TABLE_CONFIG} from './config'
import {Select} from '@/components/select'
import {useAuth} from '@/app/context/AuthContext'
import Tippy from '@tippyjs/react'
import {regexPassword} from '@/app/constants'

type Props = {
  data?: UserItem
  handleClose: () => void
  handleUpdated: () => void
}

const CreateEditUser: FC<Props> = ({handleClose, data, handleUpdated}) => {
  const {rows, settings} = USER_TABLE_CONFIG
  const {endpoint, validation} = settings

  const [dataOption, setDataOption] = useState<{
    [key: string]: any[]
  }>({})

  const {currentUser, company_id} = useAuth()

  const generateField = useMemo(() => {
    return rows
      .filter((row) => row.infoCreateEdit)
      .reduce(
        (acc, config) => ({
          ...acc,
          [config.key]: data?.[config.key] ?? config.infoCreateEdit?.defaultValue ?? '',
        }),
        {} as UserItem
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (!currentUser) return

    const rowHasDependencyApi = rows.filter((el) => el?.infoCreateEdit?.dependencyApi)
    const allDependencyApi = rowHasDependencyApi.map((el) =>
      request.post(el?.infoCreateEdit?.dependencyApi as string, {
        company_id,
      })
    )

    // GET all dependency of select component
    Promise.all(allDependencyApi).then((resList) => {
      let newDataOption = {}
      resList.forEach((res) => {
        const {data = {}, config} = res
        const options = data.data || []
        const dependencyApiRequest = config?.url

        const keyOption = rowHasDependencyApi.find(
          (el) => el.infoCreateEdit?.dependencyApi === dependencyApiRequest
        )?.key

        // unexpected
        if (data.error || !keyOption || !Array.isArray(options) || !options?.length) return

        newDataOption = {...newDataOption, [keyOption]: options}
      })

      setDataOption(newDataOption)
    })
  }, [currentUser])

  useEffect(() => {
    registerField('password', {
      validate(value: string) {
        if (!value?.trim()) {
          return !data?.id ? convertFieldRequired('Password') : setFieldValue('password', '')
        }

        if (!value?.trim()?.match(regexPassword)) {
          return convertFieldPassword('Password')
        }

        return ''
      },
    })
  }, [])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    dirty,
    handleSubmit,
    setSubmitting,
    handleBlur,
    setFieldValue,
    registerField,
  } = useFormik<UserItem>({
    initialValues: generateField,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleCreateOrUpdate,
  })

  async function handleCreateOrUpdate() {
    const payload = validation.cast(values) // automatically trim and format number (declare in validateSchema formik)
    const newPayload = {
      ...payload,
      company_id,
    }

    try {
      const {data: dataRes} = data?.id
        ? await request.put<DataResponse<UserItem>>(endpoint + '/' + data?.id, newPayload) // edit
        : await request.post<DataResponse<UserItem>>(endpoint || '', newPayload) // create

      // unknown error
      if (dataRes?.error) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(dataRes?.message),
        })
      }

      const message = `User "${dataRes?.data?.username}" successfully ${
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

  // ====================================== RENDER JSX , handle logic above ================================
  function renderComponent(info: TableRow<string>) {
    const {infoCreateEdit, name, key} = info
    const {
      type,
      required,
      typeComponent,
      column,
      className,
      subTextWhenChecked,
      subTextWhenNoChecked,
      keyLabelOption,
      keyValueOption,
      options,
    } = infoCreateEdit || {}

    switch (typeComponent) {
      case 'checkbox-rounded':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <CheckboxRounded
              key={key}
              name={key}
              label={name}
              checked={!!values[key]}
              onChange={handleChange}
              subTextWhenChecked={subTextWhenChecked}
              subTextWhenNoChecked={subTextWhenNoChecked}
              id={key}
            />
          </div>
        )
      case 'input':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <Input
              id={name}
              required={key === 'password' && data?.id ? true : !!required}
              label={name}
              onBlur={handleBlur}
              name={key}
              value={values[key]}
              type={type}
              onChange={handleChange}
              error={errors[key] as string}
              touched={!!touched[key]}
              noThereAreCommas={false}
              autoComplete='new-password'
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
            />
          </div>
        )
      case 'textarea':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <TextArea
              label={name}
              onBlur={handleBlur}
              name={key}
              value={values[key] || ''}
              onChange={handleChange}
              error={errors[key] as string}
              touched={!!touched[key]}
            />
          </div>
        )
      case 'select':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <Select
              required={required}
              label={name}
              name={key}
              value={values[key] || ''}
              onBlur={handleBlur}
              onChange={handleChange}
              keyLabelOption={keyLabelOption || 'label'}
              keyValueOption={keyValueOption || dataOption[key] ? 'id' : 'value'}
              error={errors[key] as string}
              touched={!!touched[key]}
              classShared=''
              options={dataOption[key] || options || []}
            />
          </div>
        )
      default:
        return <Fragment key={key}></Fragment>
    }
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      style={{}}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={true}
      onHide={handleClose}
      backdrop={true}
    >
      {/* Header */}
      <div className='modal-header p-30px'>
        <h2 className='m-0'>{data?.id ? 'Edit' : 'New'} User</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>

      {/* Body */}
      <div
        style={{maxHeight: 'calc(100vh - 240px)'}}
        className='modal-body py-30px ps-30px pe-30px overflow-x-auto'
      >
        <div
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid'>
            <form className='row gx-30px gy-16px' onSubmit={handleSubmit}>
              <div className='col-8 border border-left-0 border-top-0 border-bottom-0 border-gray-200'>
                <div className='row g-16px'>
                  <div className='col-12'>
                    <h3 className='mb-8px fw-bold'>Information</h3>
                  </div>
                  {rows
                    .filter((el) => !!el.infoCreateEdit && el.infoCreateEdit?.group !== 'account')
                    .map(renderComponent)}
                </div>
              </div>
              <div className='col-4'>
                <div className='row g-16px'>
                  <div className='col-12'>
                    <h3 className='mb-8px fw-bold'>Account</h3>
                  </div>
                  {rows
                    .filter((el) => !!el.infoCreateEdit && el.infoCreateEdit?.group === 'account')
                    .map(renderComponent)}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={handleClose}
          disabled={isSubmitting}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='btn-lg btn-primary fs-6'
          loading={isSubmitting}
          disabled={isSubmitting || (data?.id && !dirty)}
          onClick={() => handleSubmit()}
        >
          {data?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateEditUser
