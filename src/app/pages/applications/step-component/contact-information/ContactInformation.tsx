import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../utils/globalConfig'
import {PropsStepApplication, ApplicationConfig} from '../../../../modules/auth'
import Button from '../../../../components/button/Button'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import {INIT_BLOCK_ADDRESS} from './../../../../constants/index'
import request from '../../../../axios'
import ErrorMessage from '../../../../components/error/ErrorMessage'

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
    const {key, column, options, keyLabelOfOptions, keyValueOfOptions} = item
    let Component: any = item?.component

    // nothing
    if (!Component) return

    const className = !column
      ? 'flex-grow-1 w-300px w-lg-unset'
      : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    if (Component.name === 'InputAdvance') {
      return (
        <div className='d-flex flex-column'>
          <Component
            classShared={className}
            className='w-100'
            name={key}
            value={values[key]}
            onChange={handleChange}
            insertLeft={
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
            }
          />

          {errors[key] && touched[key] && (
            <ErrorMessage shouldShowMessage={errors[key] && touched[key]} message={errors[key]} />
          )}
        </div>
      )
    }

    if (Component.name === 'Select') {
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

    if (Component.name === 'Input') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
        />
      )
    }

    return (
      <Component
        value={values[key]}
        onChange={handleChange}
        name={key}
        classShared={className}
        error={errors[key]}
        touched={touched[key]}
        errorTitle={errors[key]}
      />
    )
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

  function handleRemoveBlockAddress(index: number) {
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
      {values.address_contact_info.map((_, indexParent) => {
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
                  (Component.name === 'Select' ? (
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
                    <Component
                      value={values['address_contact_info']?.[indexParent]?.[key]}
                      onChange={(e) => handleChangeBlockAddress(e, indexParent, key)}
                      name={key}
                      classShared={classNameComponent}
                      error={errors['address_contact_info']?.[indexParent]?.[key]}
                      touched={touched['address_contact_info']?.[indexParent]?.[key]}
                      errorTitle={errors['address_contact_info']?.[indexParent]?.[key]}
                    />
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
                      onClick={() => handleRemoveBlockAddress(indexParent)}
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
