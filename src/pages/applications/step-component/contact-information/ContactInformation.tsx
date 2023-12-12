import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'

import request from '../../../../app/axios'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import {swalConfirm, swalToast} from '../../../../app/swal-notification'
import {Select} from '@/components/select'
import Button from '@/components/button/Button'
import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, BlockAddress, PropsStepApplication} from '@/app/types'
import {DEFAULT_MESSAGE_ERROR_500, INIT_BLOCK_ADDRESS} from '@/app/constants'
import {COUNTRY_PHONE_CODE} from '@/app/utils'
import {useParams} from 'react-router-dom'

const ContactInformation: FC<PropsStepApplication> = ({config, formik}) => {
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [defaultValueAddress, setDefaultValueAddress] = useState<number | string>('')
  const [defaultValueCountry, setDefaultValueCountry] = useState<number | string>('')
  const {applicationIdEdit} = useParams()
  const {values, touched, errors, handleChange, setValues, setFieldValue} = formik

  async function onFetchDataList() {
    try {
      const updatedDataMarketing = {...dataOption}
      const endpoint = [...config, ...BLOCK_ADDRESS_CONFIG].filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const key = endpoint[index].key
        updatedDataMarketing[key] = res?.data?.data
      })

      setDataOption(updatedDataMarketing)
      setDefaultValueCountry(updatedDataMarketing?.country.length > 0 ? 'Singapore' : '')

      !applicationIdEdit &&
        setFieldValue(
          `address_contact_info[0][country]`,
          updatedDataMarketing?.country.length > 0 ? 'Singapore' : ''
        )
      !applicationIdEdit &&
        setFieldValue(
          `address_contact_info[0][address_type_id]`,
          updatedDataMarketing?.address_type_id.length > 0
            ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)
                .length > 0
              ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)[0]
                  .id
              : updatedDataMarketing?.address_type_id[0].id
            : ''
        )
      setDefaultValueAddress(
        updatedDataMarketing?.address_type_id.length > 0
          ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1).length >
            0
            ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)[0].id
            : updatedDataMarketing?.address_type_id[0].id
          : ''
      )
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChangeBlockAddress(e: React.ChangeEvent<any>, index: number, key: string) {
    const {value} = e.target

    setFieldValue(`address_contact_info[${index}][${key}]`, value)
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      column,
      options,
      keyLabelOfOptions,
      dependencyApi,
      keyValueOfOptions,
      typeInput,
      typeComponent,
    } = item
    let Component: any = item?.component

    // nothing
    if (!Component) return

    const className = !column
      ? 'flex-grow-1'
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-200px'

    if (typeComponent === 'Select') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          options={!!dependencyApi ? dataOption[key] || [] : options}
          error={errors[key]}
          touched={touched[key]}
          keyValueOption={keyValueOfOptions}
          keyLabelOption={keyLabelOfOptions}
        />
      )
    }

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
            insertLeft={
              typeInput === 'phone' ? (
                <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
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
                    />
                  </span>
                </Tippy>
              ) : undefined
            }
          />

          {errors[key] && touched[key] && <ErrorMessage message={errors[key]} />}
        </div>
      )
    }

    // unexpected
    return <Component />
  }

  function handleAddBlock() {
    setValues(
      {
        ...values,
        address_contact_info: [
          ...values.address_contact_info,
          {
            ...INIT_BLOCK_ADDRESS,
            address_type_id: defaultValueAddress || '',
            country: (defaultValueCountry as string) || '',
          },
        ],
      },
      false
    )
  }

  function handleShowConfirmDelete(item: BlockAddress, index: number) {
    if (!item.id) return handleRemoveBlockAddress(item, index)

    swalConfirm
      .fire({
        title: 'Are You Sure?',
        text: `You Won't Be Able To Revert This.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleRemoveBlockAddress(item, index)
        }
      })
  }

  async function handleRemoveBlockAddress(item: BlockAddress, index: number) {
    try {
      item.id && (await request.delete(`/address/${item.id}`))
      setValues(
        {
          ...values,
          address_contact_info: values.address_contact_info.filter((_, i) => i !== index),
        },
        false
      )

      formik.setErrors({
        ...errors,
        address_contact_info: (errors?.address_contact_info as string[])?.filter(
          (_, i) => i !== index
        ),
      })
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MESSAGE_ERROR_500,
        icon: 'error',
      })
    }
  }

  return (
    <>
      {config?.map((item, i) => {
        const {label, column, isHide, required, className} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <Fragment key={i}>
            <div
              className={clsx([
                'd-flex flex-column flex-xxl-row align-items-start align-items-xxl-stretch gap-3 gap-xxl-8',
                !column ? 'full' : '',
                className,
              ])}
            >
              <div
                className={clsx([
                  'input-title-application left fs-4 text-start text-lg-end',
                  required && 'required',
                ])}
              >
                {label}
              </div>

              {renderComponent(item)}
            </div>
          </Fragment>
        )
      })}

      {/* Block address */}
      {values.address_contact_info.map((blockAddress, indexParent) => {
        return BLOCK_ADDRESS_CONFIG.map((item, i) => {
          const {
            label,
            column,
            isHide,
            required,
            className,
            key,
            dependencyApi,
            component,
            keyLabelOfOptions,
            keyValueOfOptions,
            typeComponent,
          } = item

          if (isHide) return <Fragment key={i}></Fragment>

          let Component = component

          const classNameComponent = !column
            ? 'flex-grow-1'
            : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-200px'

          return (
            <Fragment key={i}>
              {i === 0 && <div className='separator-contact full'></div>}
              <div
                className={clsx([
                  'd-flex flex-column flex-xxl-row align-items-start align-items-xxl-stretch gap-3 gap-xxl-8',
                  !column ? 'full' : '',
                  className,
                ])}
              >
                <div
                  className={clsx([
                    'input-title-application left fs-4 text-start text-lg-end',
                    required && 'required',
                  ])}
                >
                  {label}
                </div>

                {Component &&
                  (typeComponent === 'Select' ? (
                    <Component
                      value={values['address_contact_info']?.[indexParent]?.[key]}
                      onChange={(e) => handleChangeBlockAddress(e, indexParent, key)}
                      name={key}
                      classShared={classNameComponent}
                      options={!!dependencyApi ? dataOption[key] || [] : ''}
                      error={errors['address_contact_info']?.[indexParent]?.[key]}
                      touched={touched['address_contact_info']?.[indexParent]?.[key]}
                      keyValueOption={keyValueOfOptions || 'label'}
                      keyLabelOption={keyLabelOfOptions || 'value'}
                    />
                  ) : (
                    <div className='d-flex flex-column w-100'>
                      <Component
                        value={values['address_contact_info']?.[indexParent]?.[key]}
                        onChange={(e) => handleChangeBlockAddress(e, indexParent, key)}
                        name={key}
                        classShared={classNameComponent}
                      />

                      {errors['address_contact_info']?.[indexParent]?.[key] &&
                        touched['address_contact_info']?.[indexParent]?.[key] && (
                          <ErrorMessage
                            message={errors['address_contact_info']?.[indexParent]?.[key]}
                          />
                        )}
                    </div>
                  ))}
              </div>

              {BLOCK_ADDRESS_CONFIG.length === i + 1 && (
                <div
                  className={clsx([
                    'd-flex align-items-center justify-content-end full gap-3',
                    indexParent === 0 && values.address_contact_info.length > 1
                      ? 'd-none'
                      : 'd-block',
                  ])}
                >
                  {indexParent > 0 && (
                    <Button
                      className='btn-sm btn-light-danger h-45px fs-14'
                      onClick={() => handleShowConfirmDelete(blockAddress, indexParent)}
                    >
                      Close Block
                    </Button>
                  )}
                  {values.address_contact_info.length === indexParent + 1 && (
                    <Button
                      className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'
                      onClick={handleAddBlock}
                    >
                      + Add New Block
                    </Button>
                  )}
                </div>
              )}
            </Fragment>
          )
        })
      })}
    </>
  )
}

export default ContactInformation
