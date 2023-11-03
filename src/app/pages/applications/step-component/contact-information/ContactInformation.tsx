import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import Tippy from '@tippyjs/react'
import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../utils/globalConfig'
import {PropsStepApplication, ApplicationConfig} from '../../../../modules/auth'
import GeneralButton from '../GeneralButton'

import Button from '../../../../components/button/Button'
import request from '../../../../axios'
import {BLOCK_ADDRESS_CONFIG} from '../config'

const ContactInformation: FC<PropsStepApplication> = ({
  changeStep,
  formData,
  setFormData,
  config = [],
  onGoToStep,
  setChangeStep,
}) => {
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})

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

  // const [blockAddress, setBlockAddress] = useEffect(() => )

  useEffect(() => {
    if (!changeStep) return

    validateForm().then((objectError) => {
      if (Object.keys(objectError).length > 0) {
        setErrors(objectError)
        setTouched(
          Object.keys(objectError).reduce((result, current) => ({...result, [current]: true}), {})
        )
        setChangeStep(undefined)
      } else {
        onGoToStep(changeStep)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeStep])

  const initialValues = useMemo(() => {
    return config.reduce(
      (result, current) => ({
        ...result,
        [current.key]: formData[current.key] || current.defaultValue || '',
      }),
      {
        address_contact_info: formData.address_contact_info,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  const schema = useMemo(() => {
    const schemaObject = config
      .filter((item) => item.required)
      .reduce(
        (result, current) => ({
          ...result,
          [current.key]: Yup.string().required(
            `${current.labelError || current.label} is required.`
          ),
        }),
        {}
      )

    const validationBlockAddress = BLOCK_ADDRESS_CONFIG.filter((item) => item.required).reduce(
      (result, current) => ({
        ...result,
        [current.key]: Yup.string().required(`${current.labelError || current.label} is required.`),
      }),
      {}
    )

    const schemaBlockAddress = Yup.object().shape({
      address_contact_info: Yup.array().of(Yup.object().shape(validationBlockAddress)),
    })

    return Yup.object().shape(schemaObject).concat(schemaBlockAddress)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.address_contact_info])

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    setErrors,
    setTouched,
    setValues,
  } = useFormik<any>({
    initialValues,
    validationSchema: schema,
    onSubmit: () => onGoToStep(),
  })

  function handleChangeData(e: React.ChangeEvent<any>) {
    const {value, type, checked, name} = e.target

    //formik
    handleChange(e)
    if (type === 'checkbox') {
      return setFormData({
        ...formData,
        [name]: Array.isArray(formData[name])
          ? formData[name].includes(value)
            ? Array.from(formData[name]).filter((item) => item !== value)
            : [...Array.from(typeof formData[name] === 'string' ? '' : formData[name]), value]
          : checked,
      })
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleChangeBlockAddress(e: React.ChangeEvent<any>, index: number, key: string) {
    const {value} = e.target
    values['address_contact_info'][index][key] = value

    setValues({
      ...values,
      address_contact_info: values.address_contact_info.map((item, i) =>
        i === index ? {...item, [key]: value} : item
      ),
    })
    setFormData({
      ...formData,
      address_contact_info: formData.address_contact_info.map((item, i) =>
        i === index ? {...item, [key]: value} : item
      ),
    })
  }

  function renderComponent(item: ApplicationConfig) {
    const {key, isFullLayout, column, options, keyLabelOfOptions, keyValueOfOptions} = item
    let Component: any = item?.component

    // nothing
    if (!Component) return

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-300px w-lg-unset'
        : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    if (Component.name === 'InputAdvance') {
      return (
        <Component
          classShared={className}
          className='w-100'
          name={key}
          value={formData[key]}
          onChange={handleChangeData}
          insertLeft={
            <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
              {/* Wrapper with a span tag to show tooltip */}
              <span>
                <Select
                  onChange={handleChangeData}
                  value={formData[key]}
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
      )
    }

    if (Component.name === 'Select') {
      return (
        <Component
          value={formData[key]}
          onChange={handleChangeData}
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
          value={formData[key]}
          onChange={handleChangeData}
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
        value={formData[key]}
        onChange={handleChangeData}
        name={key}
        classShared={className}
        error={errors[key]}
        touched={touched[key]}
        errorTitle={errors[key]}
      />
    )
  }

  function handleAddBlock() {
    const newBlock = {
      address_type_id: '',
      address_label: '',
      street_1: '',
      street_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    }

    setValues({
      ...values,
      address_contact_info: [...values.address_contact_info, newBlock],
    })
    setFormData({
      ...formData,
      address_contact_info: [...formData.address_contact_info, newBlock],
    })
  }

  function handleRemoveBlockAddress(index: number) {
    setValues({
      ...values,
      address_contact_info: values.address_contact_info.filter((_, i) => i === index),
    })
    setFormData({
      ...formData,
      address_contact_info: formData.address_contact_info.filter((_, i) => i === index),
    })
  }

  return (
    <>
      {config?.map((item, i) => {
        const {label, isFullLayout, column, isHide, required, className} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <Fragment key={i}>
            <div
              className={clsx([
                'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
                isFullLayout || !column ? 'full' : '',
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
      {formData.address_contact_info.map((_, indexParent) => {
        return BLOCK_ADDRESS_CONFIG.map((item, i) => {
          const {
            label,
            isFullLayout,
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

          const classNameComponent =
            isFullLayout || !column
              ? 'flex-grow-1 w-300px w-lg-unset'
              : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

          return (
            <Fragment key={i}>
              {i === 0 && <div className='separator-contact full'></div>}
              <div
                className={clsx([
                  'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
                  isFullLayout || !column ? 'full' : '',
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
                      value={formData['address_contact_info']?.[indexParent]?.[key]}
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
                      value={formData['address_contact_info']?.[indexParent]?.[key]}
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
                    indexParent === 0 && formData.address_contact_info.length > 1
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
                  {formData.address_contact_info.length === indexParent + 1 && (
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
      <GeneralButton handleSubmit={handleSubmit} />
    </>
  )
}

export default ContactInformation
