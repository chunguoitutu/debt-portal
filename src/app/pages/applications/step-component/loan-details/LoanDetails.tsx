import clsx from 'clsx'
import {FC, Fragment, useMemo} from 'react'
import * as Yup from 'yup'

import ErrorMessage from '../../../../components/error/ErrorMessage'
import {useFormik} from 'formik'
import {PropsStepApplication} from '../../../../modules/auth'
import GeneralButton from '../GeneralButton'

const LoanDetails: FC<PropsStepApplication> = ({
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

  function renderComponent(item) {
    const {key, data = [], isFullLayout, column, options} = item
    let Component = item?.component

    // nothing
    if (!Component) return

    if (Component.name === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key].includes(item.value)}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    if (Component.name === 'TextArea') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            classShared='flex-grow-1'
            value={item.value}
            onChange={handleChangeData}
            name={key}
            touched={touched}
            errors={errors}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    const className = isFullLayout || !column ? 'flex-grow-1' : 'input-wrap flex-shrink-0'

    if (Component.name === 'Select') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={formData[key]}
            onChange={handleChangeData}
            name={key}
            classShared={className}
            options={options}
            touched={touched}
            errors={errors}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    return (
      <div className='d-flex flex-column w-100'>
        <Component
          value={item.value}
          onChange={handleChangeData}
          name={key}
          classShared={className}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
        />
      </div>
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
                'input-title-application-step2 left fs-4 text-start text-lg-end',
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
export default LoanDetails
