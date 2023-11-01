import {FC, Fragment, useMemo} from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import Tippy from '@tippyjs/react'

import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../utils/globalConfig'
import {PropsStepApplication} from '../../../../modules/auth'
import GeneralButton from '../GeneralButton'
import {ApplicationConfig} from '../../../../modules/auth'

const ContactInformation: FC<PropsStepApplication> = ({
  formData,
  setFormData,
  config = [],
  onNextStep,
}) => {
  const initialValues = useMemo(() => {
    return config.reduce(
      (result, current) => ({...result, [current.key]: current.defaultValue || ''}),
      {}
    )
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
    return Yup.object().shape(schemaObject)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  const {touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: onNextStep,
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

  function renderComponent(item: ApplicationConfig) {
    const {key, isFullLayout, column, options} = item
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
                  value={formData.country_phone_code}
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
          options={options}
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

  return (
    <>
      {config.map((item, i) => {
        const {label, isFullLayout, column, isHide, required, className} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
              isFullLayout || !column ? 'full' : '',
              className,
            ])}
            key={i}
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
        )
      })}
      <GeneralButton handleSubmit={handleSubmit} />
    </>
  )
}

export default ContactInformation
