import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../utils/globalConfig'
import {PropsStepApplication, ApplicationConfig, BlockAddress} from '../../../../modules/auth'
import Button from '../../../../components/button/Button'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import {INIT_BLOCK_ADDRESS} from './../../../../constants/index'
import request from '../../../../axios'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import {swalConfirmDelete, swalToast} from '../../../../swal-notification'
import {DEFAULT_MESSAGE_ERROR_500} from '../../../../constants/error-message'

const ContactInformation: FC<PropsStepApplication> = ({config, formik}) => {
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})

  const {values, touched, errors, handleChange, setValues, setFieldValue} = formik

  useEffect(() => {
    const allApi = [...config, ...BLOCK_ADDRESS_CONFIG]
      .filter((item) => item.dependencyApi)
      .map((item) => request.post(item.dependencyApi as string), {
        status: true,
      })

    Promise.all(allApi).then((res) => {
      let result: {[key: string]: any[]} = {}

      res.forEach((res) => {
        const configItem = [...config, ...BLOCK_ADDRESS_CONFIG].find(
          (item) => item.dependencyApi === res.config.url
        )
        const data = res.data.data
        result = {...result, [configItem?.key as string]: data}

        if (!configItem) return
      })

      setDataOption(result)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChangeBlockAddress(e: React.ChangeEvent<any>, index: number, key: string) {
    const {value} = e.target
    setFieldValue(`address_contact_info[${index}][${key}]`, value)
  }

  function renderComponent(item: ApplicationConfig) {
    const {key, column, options, keyLabelOfOptions, keyValueOfOptions, typeInput, typeComponent} =
      item
    let Component: any = item?.component

    // nothing
    if (!Component) return

    const className = !column
      ? 'flex-grow-1 w-300px w-lg-unset'
      : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    if (typeComponent === 'Select') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          options={options || dataOption['address_type_id'] || []}
          isOptionDefault={key === 'address_type_id' ? false : true}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
          fieldValueOption={keyValueOfOptions || 'label'}
          fieldLabelOption={keyLabelOfOptions || 'value'}
        />
      )
    }

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column'>
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
        address_contact_info: [...values.address_contact_info, INIT_BLOCK_ADDRESS],
      },
      false
    )
  }

  function handleShowConfirmDelete(item: BlockAddress, index: number) {
    if (!item.id) return handleRemoveBlockAddress(item, index)

    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this.`,
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
                'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
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
            component,
            keyLabelOfOptions,
            keyValueOfOptions,
            options,
            typeComponent,
          } = item

          if (isHide) return <Fragment key={i}></Fragment>

          let Component = component

          const classNameComponent = !column
            ? 'flex-grow-1 w-300px w-lg-unset'
            : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

          return (
            <Fragment key={i}>
              {i === 0 && <div className='separator-contact full'></div>}
              <div
                className={clsx([
                  'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
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
                      options={options || dataOption['address_type_id'] || []}
                      error={errors['address_contact_info']?.[indexParent]?.[key]}
                      touched={touched['address_contact_info']?.[indexParent]?.[key]}
                      errorTitle={errors['address_contact_info']?.[indexParent]?.[key]}
                      fieldValueOption={keyValueOfOptions || 'label'}
                      fieldLabelOption={keyLabelOfOptions || 'value'}
                    />
                  ) : (
                    <div className='d-flex flex-column'>
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
                      className='btn-sm btn-light-danger'
                      onClick={() => handleShowConfirmDelete(blockAddress, indexParent)}
                    >
                      Close Block
                    </Button>
                  )}
                  {values.address_contact_info.length === indexParent + 1 && (
                    <Button className='btn-sm btn-primary' onClick={handleAddBlock}>
                      Add New Block
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
